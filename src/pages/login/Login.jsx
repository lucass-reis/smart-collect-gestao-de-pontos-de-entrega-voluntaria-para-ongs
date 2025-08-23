import './Login.css'

import React, { useState } from 'react';
import './Login.css';

export default function Login() {
  // Estados para armazenar as entradas
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Função para validar o formulário
  const handleLogin = (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Por favor, insira um e-mail válido.');
      return;
    }

    setError('');
    alert('Login realizado com sucesso!');
    // Aqui você pode redirecionar ou chamar uma API para autenticação
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="email">E-mail</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Digite seu e-mail"
            required 
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Senha</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Digite sua senha" 
            required 
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit" className="login-button">Entrar</button>
      </form>
    </div>
  );
};