function Filtro({ categorias, categoriaSelecionada, onSelecionar }) {
  return (
    <div className="p-4 w-35">
      <h1 className="font-bold text-3xl text-gray-800 mb-4 underline">
        Categorias
      </h1>
      <button
        onClick={() => onSelecionar(null)}
        className={`block w-full text-left py-3 border-b font-semibold transition ${
          !categoriaSelecionada ? 'text-blue-600' : 'text-gray-600 hover:text-black'
        }`}
      >
        Todos
      </button>
      {categorias.map((categoria) => (
        <button
          key={categoria.id}
          onClick={() => onSelecionar(categoria.id)}
          className={`block w-full text-left py-3 border-b transition ${
            categoriaSelecionada === categoria.id
              ? 'text-blue-600 font-semibold'
              : 'text-gray-600 hover:text-black'
          }`}
        >
          {categoria.nome}
        </button>
      ))}
    </div>
  );
}

export default Filtro
