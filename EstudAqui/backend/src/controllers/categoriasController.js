import conexao from '../database/conexao.js';

export async function listar(req, res) {
  try {
    const [rows] = await conexao.query('SELECT * FROM categorias ORDER BY nome');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar categorias', detalhe: err.message });
  }
}

export async function criar(req, res) {
  if (req.usuario?.cargo !== 'Administrador') {
    return res.status(403).json({ erro: 'Apenas administradores podem criar categorias' });
  }
  const { nome } = req.body;
  if (!nome?.trim()) return res.status(400).json({ erro: 'Nome é obrigatório' });

  try {
    const [existe] = await conexao.query('SELECT id FROM categorias WHERE nome = ?', [nome.trim()]);
    if (existe.length > 0) return res.status(409).json({ erro: 'Categoria já existe' });

    const [result] = await conexao.query('INSERT INTO categorias (nome) VALUES (?)', [nome.trim()]);
    res.status(201).json({ mensagem: 'Categoria criada', id: result.insertId, nome: nome.trim() });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar categoria', detalhe: err.message });
  }
}

export async function remover(req, res) {
  if (req.usuario?.cargo !== 'Administrador') {
    return res.status(403).json({ erro: 'Apenas administradores podem remover categorias' });
  }
  const { id } = req.params;
  try {
    const [cursos] = await conexao.query('SELECT id FROM cursos WHERE categoria_id = ?', [id]);
    if (cursos.length > 0) {
      return res.status(409).json({ erro: 'Não é possível remover: existem cursos nessa categoria' });
    }
    await conexao.query('DELETE FROM categorias WHERE id = ?', [id]);
    res.json({ mensagem: 'Categoria removida' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao remover categoria', detalhe: err.message });
  }
}
