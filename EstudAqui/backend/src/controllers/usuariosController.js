import conexao from '../database/conexao.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function listar(req, res) {
  try {
    const [rows] = await conexao.query(
      'SELECT id, email, cargo, foto FROM usuarios'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar usuários', detalhe: err.message });
  }
}

export async function registrar(req, res) {
  const { email, senha, cargo } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: 'Email e senha são obrigatórios' });
  }

  try {
    const [existente] = await conexao.query(
      'SELECT id FROM usuarios WHERE email = ?',
      [email]
    );
    if (existente.length > 0) {
      return res.status(409).json({ erro: 'Email já cadastrado' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    const cargoFinal = cargo || 'Aluno';

    const [result] = await conexao.query(
      'INSERT INTO usuarios (email, senha, cargo) VALUES (?, ?, ?)',
      [email, senhaHash, cargoFinal]
    );

    res.status(201).json({
      mensagem: 'Usuário cadastrado com sucesso',
      id: result.insertId,
    });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao cadastrar usuário', detalhe: err.message });
  }
}

export async function login(req, res) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: 'Email e senha são obrigatórios' });
  }

  try {
    const [rows] = await conexao.query(
      'SELECT * FROM usuarios WHERE email = ?',
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ erro: 'Email ou senha inválidos' });
    }

    const usuario = rows[0];
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ erro: 'Email ou senha inválidos' });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, cargo: usuario.cargo },
      process.env.JWT_SECRET || 'estudaqui_secret',
      { expiresIn: '7d' }
    );

    res.json({
      mensagem: 'Login realizado com sucesso',
      token,
      usuario: {
        id: usuario.id,
        email: usuario.email,
        cargo: usuario.cargo,
        foto: usuario.foto,
      },
    });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao fazer login', detalhe: err.message });
  }
}
