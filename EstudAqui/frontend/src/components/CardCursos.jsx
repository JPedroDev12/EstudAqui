import { Link } from "react-router-dom";

function CardCursos({ curso }) {
  const imagem = curso.capa || curso.img || null;

  return (
    <div className="flex justify-between m-5 w-50 rounded-2xl bg-gray-300 shadow-2xl p-b-2">
      <div className="flex flex-col">
        {imagem ? (
          <img
            src={imagem}
            className="h-40 w-full object-cover rounded-t-2xl"
            alt={curso.nome}
          />
        ) : (
          <div className="h-40 w-full rounded-t-2xl bg-blue-200 flex items-center justify-center">
            <span className="text-blue-600 font-bold text-sm text-center px-2">{curso.nome}</span>
          </div>
        )}
        <h1 className="p-2 text-2xl font-bold text-gray-800">{curso.nome}</h1>
        {curso.modalidade && (
          <span className="px-2 text-xs font-semibold text-blue-600 uppercase">{curso.modalidade}</span>
        )}
        {curso.horas && (
          <span className="p-2 text-gray-600 font-bold">{curso.horas}Hrs</span>
        )}
        <Link
          to={`/curso/${curso.id}`}
          className="p-2 m-2 rounded-2xl bg-purple-700 text-white font-bold cursor-pointer text-center"
        >
          Mais Informações
        </Link>
      </div>
    </div>
  );
}

export default CardCursos;
