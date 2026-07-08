import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import HeaderVer from "../components/HeaderVer"

function CriarCurso() {
  const { usuario } = useAuth()
  const navigate = useNavigate()
  const [categorias, setCategorias] = useState([])
  const [nome, setNome] = useState('')
  const [modalidade, setModalidade] = useState('Presencial')
  const [categoriaId, setCategoriaId] = useState('')
  const [descricao, setDescricao] = useState('')
  const [capa, setCapa] = useState('')
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState('')

  useEffect(() => {
    if (!usuario || (usuario.cargo !== 'Professor' && usuario.cargo !== 'Administrador')) {
      navigate('/')
      return
    }
    fetch('http://localhost:3000/categorias')
      .then(r => r.json())
      .then(setCategorias)
      .catch(() => setErro('Erro ao carregar categorias'))
  }, [usuario])

  async function handleCriar() {
    setErro(''); setSucesso('')
    if (!nome || !modalidade || !categoriaId) {
      setErro('Preencha todos os campos obrigatórios')
      return
    }
    setCarregando(true)
    try {
      const res = await fetch('http://localhost:3000/cursos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categoria_id: Number(categoriaId),
          nome,
          modalidade,
          descricao: descricao || null,
          capa: capa || null,
          usuario_id: usuario.id
        })
      })
      const data = await res.json()
      if (!res.ok) { setErro(data.erro || 'Erro ao criar curso'); return }
      setSucesso(`Curso "${nome}" criado com sucesso!`)
      setNome(''); setDescricao(''); setCategoriaId(''); setCapa('')
    } catch {
      setErro('Erro ao conectar com o servidor')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div>
      <HeaderVer />
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-8">
        <div className="bg-gray-800 rounded-2xl p-10 w-full max-w-lg">
          <h1 className="text-white font-bold text-3xl mb-2">Criar Curso</h1>
          <p className="text-gray-400 mb-6">Preencha os dados do novo curso</p>

          {sucesso && <div className="bg-green-500 text-white px-4 py-2 rounded-md mb-4">{sucesso}</div>}
          {erro && <div className="bg-red-500 text-white px-4 py-2 rounded-md mb-4">{erro}</div>}

          <div className="flex flex-col gap-4">
            <div>
              <label className="text-gray-300 text-sm font-semibold mb-1 block">Nome do Curso *</label>
              <input
                type="text"
                placeholder="Ex: Auxiliar de Serviços Gerais"
                value={nome}
                onChange={e => setNome(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-400"
              />
            </div>
            <div>
              <label className="text-gray-300 text-sm font-semibold mb-1 block">Modalidade *</label>
              <select
                value={modalidade}
                onChange={e => setModalidade(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-400"
              >
                <option value="Presencial">Presencial</option>
                <option value="Online">Online</option>
              </select>
            </div>
            <div>
              <label className="text-gray-300 text-sm font-semibold mb-1 block">Categoria *</label>
              <select
                value={categoriaId}
                onChange={e => setCategoriaId(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-400"
              >
                <option value="">Selecione uma categoria</option>
                {categorias.map(c => (
                  <option key={c.id} value={c.id}>{c.nome}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-gray-300 text-sm font-semibold mb-1 block">Descrição</label>
              <textarea
                placeholder="Descreva o curso..."
                value={descricao}
                onChange={e => setDescricao(e.target.value)}
                rows={4}
                className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-400 resize-none"
              />
            </div>
            <div>
              <label className="text-gray-300 text-sm font-semibold mb-1 block">URL da Imagem (capa)</label>
              <input
                type="text"
                placeholder="https://exemplo.com/imagem.jpg"
                value={capa}
                onChange={e => setCapa(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-400"
              />
              {capa && (
                <img
                  src={capa}
                  alt="Preview da capa"
                  className="mt-2 w-full h-40 object-cover rounded-md border border-gray-600"
                  onError={e => e.target.style.display = 'none'}
                />
              )}
            </div>
            <button
              onClick={handleCriar}
              disabled={carregando}
              className="bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition disabled:opacity-60"
            >
              {carregando ? 'Criando...' : 'Criar Curso'}
            </button>
            <button onClick={() => navigate('/')} className="text-gray-400 text-sm underline text-center">
              Voltar para o início
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CriarCurso
