import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import HeaderVer from "../components/HeaderVer"

function MeusCursos() {
  const { usuario } = useAuth()
  const navigate = useNavigate()

  const [cursos, setCursos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [msg, setMsg] = useState('')
  const [erro, setErro] = useState('')

  useEffect(() => {
    if (!usuario) { navigate('/login'); return }
    if (usuario.cargo !== 'Professor' && usuario.cargo !== 'Administrador') {
      navigate('/'); return
    }
    buscarCursos()
  }, [usuario])

  async function buscarCursos() {
    setCarregando(true)
    try {
      const res = await fetch('http://localhost:3000/cursos')
      const todos = await res.json()
      // Filtra apenas os cursos do professor logado
      const meus = todos.filter(c => c.professor === usuario.email)
      setCursos(meus)
    } catch {
      setErro('Erro ao carregar cursos')
    } finally {
      setCarregando(false)
    }
  }

  async function deletarCurso(id, nome) {
    if (!confirm(`Apagar o curso "${nome}"? Ele ficará inativo.`)) return
    setMsg(''); setErro('')
    const token = localStorage.getItem('token')
    try {
      const res = await fetch(`http://localhost:3000/cursos/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await res.json()
      if (!res.ok) { setErro(data.erro || 'Erro ao apagar curso'); return }
      setMsg(`Curso "${nome}" removido com sucesso!`)
      setCursos(prev => prev.filter(c => c.id !== id))
    } catch {
      setErro('Erro ao conectar com o servidor')
    }
  }

  const corModalidade = {
    'Presencial': 'bg-orange-100 text-orange-700',
    'Online': 'bg-teal-100 text-teal-700',
  }

  return (
    <div>
      <HeaderVer />
      <div className="min-h-screen bg-gray-900 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-white font-bold text-3xl">Meus Cursos</h1>
              <p className="text-gray-400 mt-1">Gerencie os cursos que você criou</p>
            </div>
            <Link
              to="/criar-curso"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg transition"
            >
              + Criar Novo Curso
            </Link>
          </div>

          {msg && <div className="bg-green-500 text-white px-4 py-3 rounded-lg mb-4">{msg}</div>}
          {erro && <div className="bg-red-500 text-white px-4 py-3 rounded-lg mb-4">{erro}</div>}

          {carregando ? (
            <p className="text-gray-400">Carregando seus cursos...</p>
          ) : cursos.length === 0 ? (
            <div className="bg-gray-800 rounded-2xl p-10 text-center">
              <p className="text-gray-400 text-lg mb-4">Você ainda não criou nenhum curso.</p>
              <Link
                to="/criar-curso"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg transition inline-block"
              >
                Criar meu primeiro curso
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {cursos.map(curso => (
                <div
                  key={curso.id}
                  className="bg-gray-800 rounded-xl p-5 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    {curso.capa ? (
                      <img
                        src={curso.capa}
                        alt={curso.nome}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-lg bg-gray-700 flex items-center justify-center flex-shrink-0">
                        <span className="text-gray-500 text-2xl">📚</span>
                      </div>
                    )}
                    <div className="min-w-0">
                      <h2 className="text-white font-bold text-lg truncate">{curso.nome}</h2>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${corModalidade[curso.modalidade] || 'bg-gray-200'}`}>
                          {curso.modalidade}
                        </span>
                        <span className="text-gray-400 text-sm">{curso.categoria}</span>
                      </div>
                      {curso.descricao && (
                        <p className="text-gray-500 text-sm mt-1 truncate">{curso.descricao}</p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => deletarCurso(curso.id, curso.nome)}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition flex-shrink-0"
                  >
                    Apagar
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MeusCursos
