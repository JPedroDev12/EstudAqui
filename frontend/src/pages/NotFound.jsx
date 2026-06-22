import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-9xl font-bold text-blue-500">404</h1>
      <p className="text-2xl text-gray-600 font-bold">Página não encontrada</p>
      <Link
        to="/"
        className="bg-blue-500 text-white font-bold px-6 py-2 rounded-2xl"
      >
        Voltar ao início
      </Link>
    </div>
  );
}

export default NotFound;
