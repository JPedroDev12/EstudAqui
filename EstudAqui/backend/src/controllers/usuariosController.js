import conexao from '../database/conexao.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function listar(req, res) {
  try {
    const [rows] = await conexao.query('SELECT id, email, cargo, foto FROM usuarios');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar usuários', detalhe: err.message });
  }
}

export async function registrar(req, res) {
  const { email, senha, cargo } = req.body;
  if (!email || !senha) return res.status(400).json({ erro: 'Email e senha são obrigatórios' });

  try {
    const [existente] = await conexao.query('SELECT id FROM usuarios WHERE email = ?', [email]);
    if (existente.length > 0) return res.status(409).json({ erro: 'Email já cadastrado' });

    const senhaHash = await bcrypt.hash(senha, 10);
    const [result] = await conexao.query(
      'INSERT INTO usuarios (email, senha, cargo) VALUES (?, ?, ?)',
      [email, senhaHash, cargo || 'Aluno']
    );
    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso', id: result.insertId });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao cadastrar usuário', detalhe: err.message });
  }
}

export async function login(req, res) {
  const { email, senha } = req.body;
  if (!email || !senha) return res.status(400).json({ erro: 'Email e senha são obrigatórios' });

  try {
    const [rows] = await conexao.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (rows.length === 0) return res.status(401).json({ erro: 'Email ou senha inválidos' });

    const usuario = rows[0];
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) return res.status(401).json({ erro: 'Email ou senha inválidos' });
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, cargo: usuario.cargo },
      process.env.JWT_SECRET || 'estudaqui_secret',
      { expiresIn: '7d' }
    );

    res.json({
      mensagem: 'Login realizado com sucesso',
      token,
      usuario: { id: usuario.id, email: usuario.email, cargo: usuario.cargo, foto: usuario.foto },
    });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao fazer login', detalhe: err.message });
  }
}

export async function atualizarCargo(req, res) {
  if (req.usuario.cargo !== 'Administrador') {
    return res.status(403).json({ erro: 'Apenas administradores podem alterar cargos' });
  }
  const { id } = req.params;
  const { cargo } = req.body;
  const cargosValidos = ['Aluno', 'Professor', 'Administrador'];
  if (!cargo || !cargosValidos.includes(cargo)) {
    return res.status(400).json({ erro: 'Cargo inválido' });
  }
  try {
    const [existe] = await conexao.query('SELECT id FROM usuarios WHERE id = ?', [id]);
    if (existe.length === 0) return res.status(404).json({ erro: 'Usuário não encontrado' });

    await conexao.query('UPDATE usuarios SET cargo = ? WHERE id = ?', [cargo, id]);
    res.json({ mensagem: 'Cargo atualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar cargo', detalhe: err.message });
  }
}

export async function remover(req, res) {
  if (req.usuario.cargo !== 'Administrador') {
    return res.status(403).json({ erro: 'Apenas administradores podem remover usuários' });
  }
  const { id } = req.params;
  if (Number(id) === req.usuario.id) {
    return res.status(400).json({ erro: 'Você não pode deletar a si mesmo' });
  }
  try {
    const [existe] = await conexao.query('SELECT id FROM usuarios WHERE id = ?', [id]);
    if (existe.length === 0) return res.status(404).json({ erro: 'Usuário não encontrado' });

    // Remove matrículas e cursos do usuário antes de deletar
    await conexao.query('DELETE FROM matriculas WHERE usuario_id = ?', [id]);
    await conexao.query('UPDATE cursos SET ativo = 0 WHERE usuario_id = ?', [id]);
    await conexao.query('DELETE FROM usuarios WHERE id = ?', [id]);
    res.json({ mensagem: 'Usuário removido com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao remover usuário', detalhe: err.message });
  }
}
