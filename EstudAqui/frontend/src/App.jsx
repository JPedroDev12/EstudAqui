import { Routes, Route } from "react-router-dom"

import Inicio from './pages/Inicio'
import VerTodos from './pages/VerTodos'
import CursoPage from './components/CursoPage'
import Login from './pages/Login'
import Registro from './pages/Registro'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/vertodos" element={<VerTodos />} />
      <Route path="/curso/:id" element={<CursoPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
