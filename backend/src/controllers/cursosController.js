import conexao from '../database/conexao.js';

export async function listar(req, res) {
  try {
    const [rows] = await conexao.query(`
      SELECT cursos.id, cursos.nome, cursos.modalidade, cursos.descricao, cursos.capa,
             categorias.nome AS categoria,
             usuarios.email AS professor
      FROM cursos
      JOIN categorias ON cursos.categoria_id = categorias.id
      JOIN usuarios   ON cursos.usuario_id   = usuarios.id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar cursos', detalhe: err.message });
  }
}

export async function buscarPorId(req, res) {
  const { id } = req.params;
  try {
    const [rows] = await conexao.query(`
      SELECT cursos.id, cursos.nome, cursos.modalidade, cursos.descricao, cursos.capa,
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
