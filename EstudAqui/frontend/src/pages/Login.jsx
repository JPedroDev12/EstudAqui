import { useState } from "react"
import logo from "../assets/logo.png"
import { Link, useNavigate } from "react-router-dom"
import HeaderVer from "../components/HeaderVer"
import { useAuth } from "../context/AuthContext"

function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleLogin() {
    setErro('')
    if (!email || !senha) {
      setErro('Preencha todos os campos')
      return
    }
    setCarregando(true)
    try {
      const res = await fetch('http://localhost:3000/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErro(data.erro || 'Erro ao fazer login')
        return
      }
      login(data.token, data.usuario)
      navigate('/')
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
          <h1 className="text-white font-bold text-3xl">Entrar</h1>
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
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            className="w-full p-2 rounded-md bg-white text-gray-800"
          />
          <Link to="/registro" className="text-white text-sm underline">
            Não tem uma conta? Cadastre-se
          </Link>
          <button
            onClick={handleLogin}
            disabled={carregando}
            className="bg-white text-blue-600 font-bold px-10 py-2 rounded-md disabled:opacity-60"
          >
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
