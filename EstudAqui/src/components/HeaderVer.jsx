import logo from "../assets/logo.png"
import { FaArrowRight } from "react-icons/fa"
import { Link } from "react-router-dom"

function HeaderVer() {
  return (
    <header className="flex justify-between bg-blue-500 p-5 items-center">
      <Link to="/">
        <img src={logo} alt="" className="w-45 cursor-pointer" />
      </Link>
      <nav className="text-white font-bold text-2xl">
        <ul className="flex gap-10">
          <li>
            <Link to="/sobrenos">Sobre Nós</Link>
          </li>
          <li>
            <Link to="/">Início</Link>
          </li>
        </ul>
      </nav>
      <div className="flex gap-4 items-center">
        <Link
          to="/registro"
          className="text-blue-500 bg-white rounded-2xl font-bold text-2xl p-2 shadow-black shadow-2xl"
        >
          Registre-se
        </Link>
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
