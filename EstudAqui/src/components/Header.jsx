import logo from "../assets/logo.png"
import { Link } from "react-router-dom"

function Header() {
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
      <Link
        to="/registro"
        className="text-blue-500 bg-white rounded-2xl font-bold text-2xl p-2 shadow-black shadow-2xl"
      >
        Registre-se
      </Link>
    </header>
  );
}

export default Header
