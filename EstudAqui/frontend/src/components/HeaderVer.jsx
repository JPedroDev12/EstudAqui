import logo from "../assets/logo.png"
import { FaArrowRight } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function HeaderVer() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <header className="flex justify-between bg-blue-500 p-5 items-center">
      <Link to="/">
        <img src={logo} alt="" className="w-45 cursor-pointer" />
      </Link>
      <nav className="text-white font-bold text-2xl">
        <ul className="flex gap-10">
          <li><Link to="/sobrenos">Sobre Nós</Link></li>
          <li><Link to="/">Início</Link></li>
        </ul>
      </nav>
      <div className="flex gap-4 items-center">
        {usuario ? (
          <>
            <span className="text-white font-semibold text-lg">
              Olá, {usuario.email.split('@')[0]}
              <span className="ml-2 text-sm bg-blue-700 px-2 py-1 rounded-full">{usuario.cargo}</span>
            </span>
            <button
              onClick={handleLogout}
              className="text-blue-500 bg-white rounded-2xl font-bold text-xl px-4 py-2 shadow-black shadow-2xl hover:bg-red-100 transition"
            >
              Sair
            </button>
          </>
        ) : (
          <Link
            to="/registro"
            className="text-blue-500 bg-white rounded-2xl font-bold text-2xl p-2 shadow-black shadow-2xl"
          >
            Registre-se
          </Link>
        )}
        <Link
          to="/vertodos"
          className="flex items-center gap-2 text-white bg-black rounded-2xl font-bold text-2xl p-2 shadow-black shadow-2xl"
        >
          Ver Todos <FaArrowRight />
        </Link>
      </div>
    </header>
  );
}

export default HeaderVer
