import { Routes, Route } from "react-router-dom"

import Inicio from './pages/Inicio'
import VerTodos from './pages/VerTodos'
import CursoPage from './components/CursoPage'
import Login from './pages/Login'
import Registro from './pages/Registro'
import NotFound from './pages/NotFound'
import Admin from './pages/Admin'
import CriarCurso from './pages/CriarCurso'
import MeusCursos from "./pages/MeusCursos"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/vertodos" element={<VerTodos />} />
      <Route path="/curso/:id" element={<CursoPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/meus-cursos" element={<MeusCursos />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/criar-curso" element={<CriarCurso />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
import { useEffect, useState } from 'react';

// Se estiver no computador, usa localhost. Se estiver no Render, use a URL do seu Web Service.
const API_URL = import.meta.env.PROD 
  ? 'https://estudaqui-gdvq.onrender.com' // VEJA NO SEU PAINEL SE ESSE É O LINK EXATO DO BACKEND
  : 'http://localhost:3000';

function App() {
  const [dados, setDados] = useState('');

  useEffect(() => {
    // Faz a chamada para o backend utilizando a URL correta
    fetch(`${API_URL}/api`)
      .then(response => response.json())
      .then(data => setDados(data.mensagem))
      .catch(err => console.error("Erro ao conectar com o backend:", err));
  }, []);

  return (
    <div>
      <h1>EstudAqui</h1>
      <p>Resposta do servidor: {dados || "Carregando..."}</p>
    </div>
  );
}

export default App;
