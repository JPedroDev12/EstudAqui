import HeaderVer from "../components/HeaderVer"

function Inicio() {
  return (
    <div>
      <HeaderVer />

      <div className="bg-yellow-100 flex flex-col items-center py-6 gap-3">
        <span className="text-yellow-500 font-bold text-4xl">30% OFF</span>
        <span className="text-yellow-500 font-bold text-3xl">
          Cursos EAD & Presencial
        </span>
        <button className="bg-red-500 text-white font-bold px-6 py-2 rounded-md text-lg">
          Aproveite!
        </button>
      </div>

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
      </div>
    </div>
  );
}

export default Inicio
