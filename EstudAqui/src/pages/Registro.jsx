import logo from "../assets/logo.png"
import { Link } from "react-router-dom"
import HeaderVer from "../components/HeaderVer";

function Registro() {
  return (
    <div className="">
      <HeaderVer/>
      
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-blue-600 rounded-2xl p-10 flex flex-col items-center gap-5 w-90">
          <img src={logo} alt="" className="w-32" />
          <h1 className="text-white font-bold text-3xl">Registrar-Se</h1>
          <input type="email" placeholder="Email" className="w-full p-2 rounded-md bg-white text-gray-800" />
          <input type="password" placeholder="Confirmar Senha" className="w-full p-2 rounded-md bg-white text-gray-800" />
          <input type="password" placeholder="Senha" className="w-full p-2 rounded-md bg-white text-gray-800" />
          <Link to="/login" className="text-white text-sm underline">Já tem uma conta? Entre aqui</Link>
          <button className="bg-white text-blue-600 font-bold px-10 py-2 rounded-md">Entrar</button>
        </div>
      </div>
    </div>
  )
}

export default Registro
