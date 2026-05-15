import { Link } from "react-router-dom";

function CardCursos({curso}) {
    return (
        <div className="flex justify-between m-5 w-50 rounded-2xl bg-gray-300 shadow-2xl p-b-2">
          {" "}
          {/*Card curso*/}
          <div className="flex flex-col">
            {" "}
            {/* Organiza Conteudo do card */}
            <img
              src={curso.img}
              className="h-40 w-full object-cover rounded-t-2xl"
              alt=""
            />
            <h1 className=" p-2 text-2xl font-bold text-gray-800">
              {curso.nome}
            </h1>
            <span className="p-2 text-gray-600 font-bold">
              {curso.horas}Hrs
            </span>
            <Link to={`/curso/${curso.id}` } className="p-2 m-2 rounded-2xl bg-purple-700 text-white font-bold cursor-pointer">
                Mais Informações

            </Link>
          </div>
        </div>
    );
}

export default CardCursos