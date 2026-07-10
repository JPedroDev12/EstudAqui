import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import HeaderVer from "../components/HeaderVer"

function Admin() {
  const { usuario } = useAuth()
  const navigate = useNavigate()
  const [aba, setAba] = useState('usuarios')

  // Usuarios
  const [usuarios, setUsuarios] = useState([])
  const [carregandoUsers, setCarregandoUsers] = useState(true)
  const [msgUsers, setMsgUsers] = useState('')
  const [erroUsers, setErroUsers] = useState('')

  // Categorias
  const [categorias, setCategorias] = useState([])
  const [carregandoCats, setCarregandoCats] = useState(true)
  const [novaCategoria, setNovaCategoria] = useState('')
  const [msgCats, setMsgCats] = useState('')
  const [erroCats, setErroCats] = useState('')

  // Cursos
  const [cursos, setCursos] = useState([])
  const [carregandoCursos, setCarregandoCursos] = useState(true)
  const [msgCursos, setMsgCursos] = useState('')
  const [erroCursos, setErroCursos] = useState('')

  useEffect(() => {
    if (!usuario || usuario.cargo !== 'Administrador') {
      navigate('/')
      return
    }
    buscarUsuarios()
    buscarCategorias()
    buscarCursos()
  }, [usuario])

  async function buscarUsuarios() {
    setCarregandoUsers(true)
    try {
      const res = await fetch('http://localhost:3000/usuarios')
      setUsuarios(await res.json())
    } catch { setErroUsers('Erro ao carregar usuários') }
    finally { setCarregandoUsers(false) }
  }

  async function buscarCategorias() {
    setCarregandoCats(true)
    try {
      const res = await fetch('http://localhost:3000/categorias')
      setCategorias(await res.json())
    } catch { setErroCats('Erro ao carregar categorias') }
    finally { setCarregandoCats(false) }
  }

  async function buscarCursos() {
    setCarregandoCursos(true)
    try {
      const res = await fetch('http://localhost:3000/cursos')
      setCursos(await res.json())
    } catch { setErroCursos('Erro ao carregar cursos') }
    finally { setCarregandoCursos(false) }
  }

  const token = () => localStorage.getItem('token')

  async function mudarCargo(id, novoCargo) {
    setMsgUsers(''); setErroUsers('')
    try {
      const res = await fetch(`http://localhost:3000/usuarios/${id}/cargo`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token()}` },
        body: JSON.stringify({ cargo: novoCargo })
      })
      const data = await res.json()
      if (!res.ok) { setErroUsers(data.erro || 'Erro'); return }
      setMsgUsers('Cargo atualizado!')
      setUsuarios(prev => prev.map(u => u.id === id ? { ...u, cargo: novoCargo } : u))
    } catch { setErroUsers('Erro ao conectar') }
  }

  async function deletarUsuario(id, email) {
    if (!confirm(`Tem certeza que quer apagar "${email}"?`)) return
    setMsgUsers(''); setErroUsers('')
    try {
      const res = await fetch(`http://localhost:3000/usuarios/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token()}` }
      })
      const data = await res.json()
      if (!res.ok) { setErroUsers(data.erro || 'Erro'); return }
      setMsgUsers('Usuário removido!')
      setUsuarios(prev => prev.filter(u => u.id !== id))
    } catch { setErroUsers('Erro ao conectar') }
  }

  async function criarCategoria() {
    setMsgCats(''); setErroCats('')
    if (!novaCategoria.trim()) { setErroCats('Digite um nome'); return }
    try {
      const res = await fetch('http://localhost:3000/categorias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token()}` },
        body: JSON.stringify({ nome: novaCategoria.trim() })
      })
      const data = await res.json()
      if (!res.ok) { setErroCats(data.erro || 'Erro'); return }
      setMsgCats(`Categoria "${data.nome}" criada!`)
      setCategorias(prev => [...prev, { id: data.id, nome: data.nome }])
      setNovaCategoria('')
    } catch { setErroCats('Erro ao conectar') }
  }

  async function deletarCategoria(id, nome) {
    if (!confirm(`Apagar categoria "${nome}"?`)) return
    setMsgCats(''); setErroCats('')
    try {
      const res = await fetch(`http://localhost:3000/categorias/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token()}` }
      })
      const data = await res.json()
      if (!res.ok) { setErroCats(data.erro || 'Erro'); return }
      setMsgCats('Categoria removida!')
      setCategorias(prev => prev.filter(c => c.id !== id))
    } catch { setErroCats('Erro ao conectar') }
  }

  async function deletarCurso(id, nome) {
    if (!confirm(`Apagar o curso "${nome}"? Ele ficará inativo.`)) return
    setMsgCursos(''); setErroCursos('')
    try {
      const res = await fetch(`http://localhost:3000/cursos/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token()}` }
      })
      const data = await res.json()
      if (!res.ok) { setErroCursos(data.erro || 'Erro'); return }
      setMsgCursos(`Curso "${nome}" removido!`)
      setCursos(prev => prev.filter(c => c.id !== id))
    } catch { setErroCursos('Erro ao conectar') }
  }

  const corCargo = {
    'Aluno': 'bg-blue-100 text-blue-700',
    'Professor': 'bg-green-100 text-green-700',
    'Administrador': 'bg-purple-100 text-purple-700',
  }

  const corModalidade = {
    'Presencial': 'bg-orange-100 text-orange-700',
    'Online': 'bg-teal-100 text-teal-700',
  }

  return (
    <div>
      <HeaderVer />
      <div className="min-h-screen bg-gray-900 p-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-white font-bold text-3xl mb-2">Painel do Administrador</h1>

          {/* Abas */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setAba('usuarios')}
              className={`px-6 py-2 rounded-t-lg font-bold transition ${aba === 'usuarios' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              Usuários
            </button>
            <button
              onClick={() => setAba('categorias')}
              className={`px-6 py-2 rounded-t-lg font-bold transition ${aba === 'categorias' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              Categorias
            </button>
            <button
              onClick={() => setAba('cursos')}
              className={`px-6 py-2 rounded-t-lg font-bold transition ${aba === 'cursos' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              Cursos
            </button>
          </div>

          {/* Aba Usuários */}
          {aba === 'usuarios' && (
            <div className="bg-gray-800 rounded-2xl overflow-hidden">
              {msgUsers && <div className="bg-green-500 text-white px-4 py-2">{msgUsers}</div>}
              {erroUsers && <div className="bg-red-500 text-white px-4 py-2">{erroUsers}</div>}
              {carregandoUsers ? (
                <p className="text-gray-400 p-6">Carregando...</p>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-700 text-gray-300 text-left">
                      <th className="px-6 py-4">ID</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Cargo Atual</th>
                      <th className="px-6 py-4">Alterar Cargo</th>
                      <th className="px-6 py-4">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuarios.map((u, i) => (
                      <tr key={u.id} className={i % 2 === 0 ? 'bg-gray-800' : 'bg-gray-750'}>
                        <td className="px-6 py-4 text-gray-400">{u.id}</td>
                        <td className="px-6 py-4 text-white">{u.email}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${corCargo[u.cargo] || 'bg-gray-200'}`}>
                            {u.cargo}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {u.id === usuario.id ? (
                            <span className="text-gray-500 text-sm italic">Você</span>
                          ) : (
                            <select
                              value={u.cargo}
                              onChange={e => mudarCargo(u.id, e.target.value)}
                              className="bg-gray-700 text-white border border-gray-600 rounded-md px-3 py-1 text-sm focus:outline-none focus:border-blue-400"
                            >
                              <option value="Aluno">Aluno</option>
                              <option value="Professor">Professor</option>
                              <option value="Administrador">Administrador</option>
                            </select>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {u.id !== usuario.id && (
                            <button
                              onClick={() => deletarUsuario(u.id, u.email)}
                              className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded-md transition"
                            >
                              Apagar
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* Aba Categorias */}
          {aba === 'categorias' && (
            <div className="bg-gray-800 rounded-2xl p-6">
              {msgCats && <div className="bg-green-500 text-white px-4 py-2 rounded-md mb-4">{msgCats}</div>}
              {erroCats && <div className="bg-red-500 text-white px-4 py-2 rounded-md mb-4">{erroCats}</div>}

              <div className="flex gap-3 mb-6">
                <input
                  type="text"
                  placeholder="Nome da nova categoria"
                  value={novaCategoria}
                  onChange={e => setNovaCategoria(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && criarCategoria()}
                  className="flex-1 p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-400"
                />
                <button
                  onClick={criarCategoria}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-md transition"
                >
                  + Criar
                </button>
              </div>

              {carregandoCats ? (
                <p className="text-gray-400">Carregando...</p>
              ) : categorias.length === 0 ? (
                <p className="text-gray-500 italic">Nenhuma categoria cadastrada.</p>
              ) : (
                <div className="flex flex-col gap-2">
                  {categorias.map(cat => (
                    <div key={cat.id} className="flex items-center justify-between bg-gray-700 px-4 py-3 rounded-lg">
                      <span className="text-white font-semibold">{cat.nome}</span>
                      <button
                        onClick={() => deletarCategoria(cat.id, cat.nome)}
                        className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded-md transition"
                      >
                        Apagar
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Aba Cursos */}
          {aba === 'cursos' && (
            <div className="bg-gray-800 rounded-2xl overflow-hidden">
              {msgCursos && <div className="bg-green-500 text-white px-4 py-2">{msgCursos}</div>}
              {erroCursos && <div className="bg-red-500 text-white px-4 py-2">{erroCursos}</div>}
              {carregandoCursos ? (
                <p className="text-gray-400 p-6">Carregando...</p>
              ) : cursos.length === 0 ? (
                <p className="text-gray-500 italic p-6">Nenhum curso ativo encontrado.</p>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-700 text-gray-300 text-left">
                      <th className="px-6 py-4">ID</th>
                      <th className="px-6 py-4">Nome</th>
                      <th className="px-6 py-4">Modalidade</th>
                      <th className="px-6 py-4">Categoria</th>
                      <th className="px-6 py-4">Professor</th>
                      <th className="px-6 py-4">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cursos.map((c, i) => (
                      <tr key={c.id} className={i % 2 === 0 ? 'bg-gray-800' : 'bg-gray-750'}>
                        <td className="px-6 py-4 text-gray-400">{c.id}</td>
                        <td className="px-6 py-4 text-white font-semibold">{c.nome}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${corModalidade[c.modalidade] || 'bg-gray-200'}`}>
                            {c.modalidade}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-300">{c.categoria}</td>
                        <td className="px-6 py-4 text-gray-400 text-sm">{c.professor}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => deletarCurso(c.id, c.nome)}
                            className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded-md transition"
                          >
                            Apagar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Admin
