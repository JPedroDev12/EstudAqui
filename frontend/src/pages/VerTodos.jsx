import Header from "../components/Header";
import Filtro from "../components/Filtro";
import CardCursos from "../components/CardCursos";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";

import Cursos from "../components/Cursos";

function VerTodos() {

  const [cursos, setCursos] = useState(Cursos);

  return (
    <div>
      <Header />

      <div className="flex gap-2 p-5">

        <div className="flex flex-col gap-2">

          <div className="gap-2 relative">

            <input
              type="search"
              placeholder="Pesquisa Curso"
              className="border-[1.5px] border-gray-700 w-65 rounded-2xl p-2 bg-gray-200 placeholder:font-bold text-2xl"
            />

            <CiSearch className="text-4xl absolute top-1 left-55" />

          </div>

          <Filtro />

        </div>

        <div className="grid grid-cols-4 gap-5">

          {cursos.map((curso) => (
            <CardCursos
              key={curso.id}
              curso={curso}
            />
          ))}

        </div>

      </div>
    </div>
  );
}

export default VerTodos;