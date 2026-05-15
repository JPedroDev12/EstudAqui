import { useState } from 'react'
import { Routes, Route } from "react-router-dom" 

import VerTodos from './pages/VerTodos'
import CursoPage from './components/CursoPage'

const categoria = [{
  
}]

function App() {

  return (
    <Routes>
      <Route path="/" element={<VerTodos/>}/>

      <Route path='/curso/:id' element={<CursoPage/>}/>
    </Routes>
  )
}

export default App
