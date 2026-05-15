function Filtro() {
    // Faz Categorias
    const categorias = [
    "Pedagogia",
    "Ensino Básico",
    "Gestão Escolar",
    "Informática",
    ]

    return (
        <div className="p-4 w-35">
            <h1 className="font-bold text-3xl text-gray-800 mg-4 underline">Categorias</h1>

            {categorias.map((categoria) => ( // Separa cada Categoria
                <button key={categoria} className="block w-full text-left py-3 border-b text-gray-600 hover:text-black">
                    {categoria}
                </button>
            ))}
        </div>
    )

}

export default Filtro