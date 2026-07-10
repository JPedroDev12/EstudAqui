import Header from "../components/Header";
import Filtro from "../components/Filtro";
import CardCursos from "../components/CardCursos";
import { CiSearch } from "react-icons/ci";
import { useState, useEffect } from "react";

function VerTodos() {
  const [cursos, setCursos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [cursosExibidos, setCursosExibidos] = useState([]);
  const [busca, setBusca] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregar() {
      try {
        const [resCursos, resCats] = await Promise.all([
          fetch("http://localhost:3000/cursos"),
          fetch("http://localhost:3000/categorias"),
        ]);
        if (!resCursos.ok) throw new Error("Erro ao buscar cursos");
        const dataCursos = await resCursos.json();
        const dataCats = await resCats.json();
        setCursos(dataCursos);
        setCursosExibidos(dataCursos);
        setCategorias(dataCats);
      } catch (err) {
        setErro("Não foi possível carregar os cursos. Verifique se o servidor está rodando.");
        console.error(err);
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  useEffect(() => {
    let filtrados = cursos;
    if (categoriaSelecionada) {
      filtrados = filtrados.filter((c) => {
        // cursos retornam categoria como nome (string), precisamos mapear
        const cat = categorias.find((k) => k.id === categoriaSelecionada);
        return cat && c.categoria === cat.nome;
      });
    }
    if (busca.trim()) {
      filtrados = filtrados.filter((c) =>
        c.nome.toLowerCase().includes(busca.toLowerCase())
      );
    }
    setCursosExibidos(filtrados);
  }, [busca, categoriaSelecionada, cursos, categorias]);

  return (
    <div>
      <Header />
      <div className="flex gap-2 p-5">
        <div className="flex flex-col gap-2">
          <div className="gap-2 relative">
            <input
              type="search"
              placeholder="Pesquisa Curso"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="border-[1.5px] border-gray-700 w-65 rounded-2xl p-2 bg-gray-200 placeholder:font-bold text-2xl"
            />
            <CiSearch className="text-4xl absolute top-1 left-55" />
          </div>
          <Filtro
            categorias={categorias}
            categoriaSelecionada={categoriaSelecionada}
            onSelecionar={setCategoriaSelecionada}
          />
        </div>

        <div className="flex-1">
          {carregando && (
            <p className="text-gray-500 text-center mt-10">Carregando cursos...</p>
          )}
          {erro && (
            <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg mt-4">{erro}</div>
          )}
          {!carregando && !erro && cursosExibidos.length === 0 && (
            <p className="text-gray-500 text-center mt-10">Nenhum curso encontrado.</p>
          )}
          <div className="grid grid-cols-4 gap-5">
            {cursosExibidos.map((curso) => (
              <CardCursos key={curso.id} curso={curso} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerTodos;
