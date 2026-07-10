import { useState } from "react"
import logo from "../assets/logo.png"
import { Link, useNavigate } from "react-router-dom"
import HeaderVer from "../components/HeaderVer"
import { useAuth } from "../context/AuthContext"

function Registro() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleRegistro() {
    setErro('')
    if (!email || !senha || !confirmarSenha) {
      setErro('Preencha todos os campos')
      return
    }
    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem')
      return
    }
    if (senha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres')
      return
    }
    setCarregando(true)
    try {
      const resReg = await fetch('http://localhost:3000/usuarios/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      })
      const dataReg = await resReg.json()
      if (!resReg.ok) {
        setErro(dataReg.erro || 'Erro ao cadastrar')
        return
      }
      const resLogin = await fetch('http://localhost:3000/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      })
      const dataLogin = await resLogin.json()
      if (resLogin.ok) {
        login(dataLogin.token, dataLogin.usuario)
        navigate('/')
      } else {
        navigate('/login')
      }
    } catch {
      setErro('Erro ao conectar com o servidor')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div>
      <HeaderVer />
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-blue-600 rounded-2xl p-10 flex flex-col items-center gap-5 w-90">
          <img src={logo} alt="" className="w-32" />
          <h1 className="text-white font-bold text-3xl">Registrar-Se</h1>
          {erro && (
            <div className="bg-red-500 text-white text-sm px-4 py-2 rounded-md w-full text-center">
              {erro}
            </div>
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full p-2 rounded-md bg-white text-gray-800"
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            className="w-full p-2 rounded-md bg-white text-gray-800"
          />
          <input
            type="password"
            placeholder="Confirmar Senha"
            value={confirmarSenha}
            onChange={e => setConfirmarSenha(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleRegistro()}
            className="w-full p-2 rounded-md bg-white text-gray-800"
          />
          <Link to="/login" className="text-white text-sm underline">
            Já tem uma conta? Entre aqui
          </Link>
          <button
            onClick={handleRegistro}
            disabled={carregando}
            className="bg-white text-blue-600 font-bold px-10 py-2 rounded-md disabled:opacity-60"
          >
            {carregando ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Registro
