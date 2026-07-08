import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import Header from "./Header"

function CursoPage() {
  const { id } = useParams()
  const [curso, setCurso] = useState(null)
  const [erro, setErro] = useState(null)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    fetch(`http://localhost:3000/cursos/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Curso não encontrado")
        return res.json()
      })
      .then((data) => {
        setCurso(data)
        setCarregando(false)
      })
      .catch((err) => {
        setErro(err.message)
        setCarregando(false)
      })
  }, [id])

  if (carregando) return <div><Header /><p className="p-5 text-gray-600">Carregando...</p></div>
  if (erro || !curso) return <div><Header /><p className="p-5 text-gray-600">Curso não encontrado.</p></div>

  return (
    <div>
      <Header />
      <div className="flex p-5 gap-4 justify-between">
        <div className="flex flex-col gap-4 w-160">
          <h1 className="font-bold text-4xl text-gray-800">{curso.nome}</h1>
          <span className="text-gray-600 text-2xl font-bold">
            {curso.descricao}
          </span>
          {curso.categoria && (
            <span className="text-sm text-blue-600 font-semibold">
              Categoria: {curso.categoria}
            </span>
          )}
          {curso.modalidade && (
            <span className="text-sm text-gray-500">
              Modalidade: {curso.modalidade}
            </span>
          )}
        </div>
        <div className="items-center flex flex-col gap-3 bg-gray-300 pb-3 rounded-2xl">
          {curso.capa ? (
            <img
              src={curso.capa}
              alt={curso.nome}
              className="w-120 h-auto rounded-t-2xl"
            />
          ) : (
            <div className="w-120 h-64 rounded-t-2xl bg-gray-400 flex items-center justify-center">
              <span className="text-gray-600 text-lg">Sem imagem</span>
            </div>
          )}
          <span className="bg-green-500 border-3 border-green-800 text-white font-bold p-1 text-2xl rounded-2xl">
            Gratuito
          </span>
          <Link
            to="/login"
            className="p-2 text-center rounded-2xl bg-blue-500 text-white font-bold w-50 text-2xl"
          >
            Cadastre-se
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CursoPage
