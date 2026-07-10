import HeaderVer from "../components/HeaderVer"
import { useAuth } from "../context/AuthContext"
import { Link } from "react-router-dom"

function Inicio() {
  const { usuario } = useAuth()

  return (
    <div>
      <HeaderVer />

      {!usuario && (
        <div className="bg-yellow-100 flex flex-col items-center py-6 gap-3">
          <span className="text-yellow-500 font-bold text-4xl">30% OFF</span>
          <span className="text-yellow-500 font-bold text-3xl">
            Cursos EAD & Presencial
          </span>
          <Link to="/registro">
            <button className="bg-red-500 text-white font-bold px-6 py-2 rounded-md text-lg">
              Aproveite!
            </button>
          </Link>
        </div>
      )}

      {usuario && (
        <div className="bg-blue-50 border-b border-blue-200 px-10 py-6">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-blue-700">
                Bem-vindo(a) de volta, {usuario.email.split('@')[0]}! 👋
              </h2>
              <p className="text-gray-600 mt-1">
                Cargo: <span className="font-semibold text-blue-600">{usuario.cargo}</span>
              </p>
            </div>
            <Link
              to="/vertodos"
              className="bg-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700 transition"
            >
              Ver meus cursos
            </Link>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center gap-4 p-10 text-center max-w-3xl mx-auto">
        <h2 className="font-bold text-xl text-gray-800">
          EstudAqui! - Sobre nós
        </h2>
        <p className="text-gray-700">
          O EstudAqui! é uma plataforma de cursos criada para tornar o
          aprendizado mais acessível, prático e eficiente. Oferecemos cursos
          presenciais e online, permitindo que cada aluno escolha a modalidade
          que melhor se adapta à sua rotina.
        </p>
        <p className="text-gray-700">
          Com conteúdos atualizados e profissionais qualificados, buscamos
          proporcionar uma experiência de ensino moderna, dinâmica e focada no
          desenvolvimento pessoal e profissional.
        </p>
        <p className="text-gray-700">
          Acreditamos que o conhecimento transforma realidades. Por isso, nossa
          missão é democratizar a educação de qualidade, conectando você às
          habilidades mais requisitadas pelo mercado de forma leve e direta.
        </p>
        <p className="text-gray-700 italic">
          "No EstudAqui!, aprender é simples, prático e feito para você
          evoluir!"
        </p>

        {!usuario && (
          <Link
            to="/registro"
            className="mt-4 bg-blue-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-blue-700 transition text-lg"
          >
            Comece agora — é grátis!
          </Link>
        )}
      </div>
    </div>
  )
}

export default Inicio
