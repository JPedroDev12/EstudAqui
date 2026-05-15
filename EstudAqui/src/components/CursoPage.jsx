import { Link, useParams } from "react-router-dom";
import Header from "./Header";
import Cursos from "./Cursos";


function CursoPage() {

    const { id } = useParams()

    const curso = Cursos.find( // ele vai procurar o curso de acordo com o id, e com isso ele vai pegar tudo dentro daquele curso e preencher o nome, descricao e img
      (curso) => curso.id === Number(id)
    )

    return (
        <div>
          <Header />
          <div className="flex p-5 gap-4 justify-between">
            <div className="flex flex-col gap-4 w-160">
              <h1 className="font-bold text-4xl text-gray-800">{curso.nome}</h1>
              <span className="text-gray-600 text-2xl font-bold">{curso.descricao}</span>
            </div>
            <div className="items-center flex flex-col gap-3 bg-gray-300 pb-3 rounded-2xl">
              <img src={curso.img} alt=""  className="w-120 h-auto rounded-t-2xl relative"/>

              <span className="absolute top-30 right-6 bg-green-500 border-3 border-green-800 text-white font-bold p-1 text-2xl rounded-2xl">Gratuito</span>

              <a href="" className="p-2 text-center rounded-2xl bg-blue-500 text-white font-bold w-50 text-2xl">
                Cadastre-se
              </a>
            </div>
          </div>
        </div>
    );
}

export default CursoPage