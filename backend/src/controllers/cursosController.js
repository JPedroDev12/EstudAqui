import conexao from '../database/conexao.js';

export async function listar(req, res) {
  try {
    const [rows] = await conexao.query(`
      SELECT cursos.id, cursos.nome, cursos.modalidade, cursos.descricao, cursos.capa, cursos.ativo,
             categorias.nome AS categoria,
             usuarios.email AS professor
      FROM cursos
      JOIN categorias ON cursos.categoria_id = categorias.id
      JOIN usuarios   ON cursos.usuario_id   = usuarios.id
      WHERE cursos.ativo = 1
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar cursos', detalhe: err.message });
  }
}

export async function buscarPorId(req, res) {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ erro: 'ID inválido' });
  }

  try {
    const [rows] = await conexao.query(`
      SELECT cursos.id, cursos.nome, cursos.modalidade, cursos.descricao, cursos.capa, cursos.ativo,
             categorias.nome AS categoria,
             usuarios.email AS professor
      FROM cursos
      JOIN categorias ON cursos.categoria_id = categorias.id
      JOIN usuarios   ON cursos.usuario_id   = usuarios.id
      WHERE cursos.id = ?
    `, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ erro: 'Curso não encontrado' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar curso', detalhe: err.message });
  }
}

export async function criar(req, res) {
  const { usuario_id, categoria_id, nome, modalidade, descricao, capa } = req.body;

  if (!usuario_id || !categoria_id || !nome || !modalidade) {
    return res.status(400).json({
      erro: 'Campos obrigatórios: usuario_id, categoria_id, nome e modalidade',
    });
  }

  if (!['Presencial', 'Online'].includes(modalidade)) {
    return res.status(400).json({ erro: 'Modalidade deve ser "Presencial" ou "Online"' });
  }

  try {
    const [usuarioExiste] = await conexao.query(
      'SELECT id FROM usuarios WHERE id = ?',
      [usuario_id]
    );
    if (usuarioExiste.length === 0) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    const [categoriaExiste] = await conexao.query(
      'SELECT id FROM categorias WHERE id = ?',
      [categoria_id]
    );
    if (categoriaExiste.length === 0) {
      return res.status(404).json({ erro: 'Categoria não encontrada' });
    }

    const [result] = await conexao.query(
      `INSERT INTO cursos (usuario_id, categoria_id, nome, modalidade, descricao, capa, ativo)
       VALUES (?, ?, ?, ?, ?, ?, 1)`,
      [usuario_id, categoria_id, nome, modalidade, descricao || null, capa || null]
    );

    res.status(201).json({
      mensagem: 'Curso criado com sucesso',
      id: result.insertId,
    });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar curso', detalhe: err.message });
  }
}

export async function atualizar(req, res) {
  const { id } = req.params;
  const { usuario_id, categoria_id, nome, modalidade, descricao, capa } = req.body;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ erro: 'ID inválido' });
  }

  if (!usuario_id || !categoria_id || !nome || !modalidade) {
    return res.status(400).json({
      erro: 'Campos obrigatórios: usuario_id, categoria_id, nome e modalidade',
    });
  }

  if (!['Presencial', 'Online'].includes(modalidade)) {
    return res.status(400).json({ erro: 'Modalidade deve ser "Presencial" ou "Online"' });
  }

  try {
    const [cursoExiste] = await conexao.query('SELECT id FROM cursos WHERE id = ?', [id]);
    if (cursoExiste.length === 0) {
      return res.status(404).json({ erro: 'Curso não encontrado' });
    }

    const [usuarioExiste] = await conexao.query(
      'SELECT id FROM usuarios WHERE id = ?',
      [usuario_id]
    );
    if (usuarioExiste.length === 0) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    const [categoriaExiste] = await conexao.query(
      'SELECT id FROM categorias WHERE id = ?',
      [categoria_id]
    );
    if (categoriaExiste.length === 0) {
      return res.status(404).json({ erro: 'Categoria não encontrada' });
    }

    await conexao.query(
      `UPDATE cursos
       SET usuario_id = ?, categoria_id = ?, nome = ?, modalidade = ?, descricao = ?, capa = ?
       WHERE id = ?`,
      [usuario_id, categoria_id, nome, modalidade, descricao || null, capa || null, id]
    );

    res.json({ mensagem: 'Curso atualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar curso', detalhe: err.message });
  }
}

export async function remover(req, res) {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ erro: 'ID inválido' });
  }

  try {
    const [cursoExiste] = await conexao.query('SELECT id, ativo FROM cursos WHERE id = ?', [id]);
    if (cursoExiste.length === 0) {
      return res.status(404).json({ erro: 'Curso não encontrado' });
    }

    if (cursoExiste[0].ativo === 0) {
      return res.status(409).json({ erro: 'Curso já está inativo' });
    }

    await conexao.query('UPDATE cursos SET ativo = 0 WHERE id = ?', [id]);

    res.json({ mensagem: 'Curso removido com sucesso (exclusão lógica)' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao remover curso', detalhe: err.message });
  }
}
