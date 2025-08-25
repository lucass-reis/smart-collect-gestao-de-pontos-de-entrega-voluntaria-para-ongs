import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import App from './App.jsx'
import './index.css'
import Cadastro from './pages/cadastro/Cadastro.jsx'
import Login from './pages/login/Login.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />

        <Route path='login' element={<Login />} />
        <Route path='register' element={<Cadastro />} />
      </Routes>
    </BrowserRouter>
)
