import conexao from '../database/conexao.js';

export async function listar(req, res) {
  try {
    const [rows] = await conexao.query(`
      SELECT
        matriculas.id,
        matriculas.data_matricula,
        usuarios.id   AS usuario_id,
        usuarios.email AS usuario_email,
        usuarios.cargo AS usuario_cargo,
        cursos.id     AS curso_id,
        cursos.nome   AS curso_nome,
        cursos.modalidade AS curso_modalidade
      FROM matriculas
      JOIN usuarios ON matriculas.usuario_id = usuarios.id
      JOIN cursos   ON matriculas.curso_id   = cursos.id
      ORDER BY matriculas.data_matricula DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar matrículas', detalhe: err.message });
  }
}

export async function criar(req, res) {
  const { usuario_id, curso_id } = req.body;

  if (!usuario_id || !curso_id) {
    return res.status(400).json({ erro: 'Campos obrigatórios: usuario_id e curso_id' });
  }

  if (isNaN(Number(usuario_id)) || isNaN(Number(curso_id))) {
    return res.status(400).json({ erro: 'usuario_id e curso_id devem ser números inteiros' });
  }

  try {
    const [usuarioExiste] = await conexao.query(
      'SELECT id FROM usuarios WHERE id = ?',
      [usuario_id]
    );
    if (usuarioExiste.length === 0) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    const [cursoExiste] = await conexao.query(
      'SELECT id FROM cursos WHERE id = ? AND ativo = 1',
      [curso_id]
    );
    if (cursoExiste.length === 0) {
      return res.status(404).json({ erro: 'Curso não encontrado ou inativo' });
    }

    const [jaMatriculado] = await conexao.query(
      'SELECT id FROM matriculas WHERE usuario_id = ? AND curso_id = ?',
      [usuario_id, curso_id]
    );
    if (jaMatriculado.length > 0) {
      return res.status(409).json({ erro: 'Usuário já matriculado neste curso' });
    }

    const [result] = await conexao.query(
      'INSERT INTO matriculas (usuario_id, curso_id) VALUES (?, ?)',
      [usuario_id, curso_id]
    );

    res.status(201).json({
      mensagem: 'Matrícula realizada com sucesso',
      id: result.insertId,
    });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar matrícula', detalhe: err.message });
  }
}

export async function listarPorUsuario(req, res) {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ erro: 'ID de usuário inválido' });
  }

  try {
    const [usuarioExiste] = await conexao.query(
      'SELECT id, email, cargo FROM usuarios WHERE id = ?',
      [id]
    );
    if (usuarioExiste.length === 0) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    const [rows] = await conexao.query(`
      SELECT
        matriculas.id,
        matriculas.data_matricula,
        cursos.id         AS curso_id,
        cursos.nome       AS curso_nome,
        cursos.modalidade AS curso_modalidade,
        cursos.descricao  AS curso_descricao,
        categorias.nome   AS curso_categoria
      FROM matriculas
      JOIN cursos     ON matriculas.curso_id     = cursos.id
      JOIN categorias ON cursos.categoria_id     = categorias.id
      WHERE matriculas.usuario_id = ?
      ORDER BY matriculas.data_matricula DESC
    `, [id]);

    res.json({
      usuario: usuarioExiste[0],
      total_matriculas: rows.length,
      matriculas: rows,
    });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar matrículas do usuário', detalhe: err.message });
  }
}
