import logo from "../assets/logo.png"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Header() {
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
      {usuario ? (
        <div className="flex items-center gap-4">
          <span className="text-white font-semibold text-lg">
            Olá, {usuario.email.split('@')[0]}
          </span>
          <button
            onClick={handleLogout}
            className="text-blue-500 bg-white rounded-2xl font-bold text-xl px-4 py-2 shadow-black shadow-2xl hover:bg-red-100 transition"
          >
            Sair
          </button>
        </div>
      ) : (
        <Link
          to="/registro"
          className="text-blue-500 bg-white rounded-2xl font-bold text-2xl p-2 shadow-black shadow-2xl"
        >
          Registre-se
        </Link>
      )}
    </header>
  );
}

export default Header
