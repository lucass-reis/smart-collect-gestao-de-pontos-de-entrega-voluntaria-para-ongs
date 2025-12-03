import { useContext, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { isAuthenticated, login } from '../../utils/auth.js';
import styles from './Login.module.css';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebase.js';
import { OngContext } from '../../context/OngContext.jsx';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setOng } = useContext(OngContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return setError('Preencha todos os campos.');

    try {
      const userCredential = await login(email, password);
      console.log(userCredential)
       const q = query(
          collection(db, "ongs"),
          where("owner", "==", userCredential.user.uid)
        );
  
        const snap = await getDocs(q);

        if (snap.empty) {
          console.warn("Nenhuma ONG encontrada para este usuário.");
          setOng(null);
        } else {
          const doc = snap.docs[0];
          const ongData = {
            id: doc.id,
            ...doc.data(),
          };

          // 3. Salva a ONG no contexto global
          setOng(ongData);

          console.log(ongData)
        }
        
      navigate('/collection-points');
    } catch (err) {
      console.error(err);
      setError('Email ou senha inválidos.');
    }
  };

  if (isAuthenticated()) {
    return <Navigate to="/collection-points" replace />;
  }

  return (
    <div className={styles.loginPageContainer}>
      <div className={styles.loginContainer}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Digite seu e-mail"/>
          </div>
          <div className={styles.inputGroup}>
            <label>Senha</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Digite sua senha"/>
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <button type="submit" className={styles.loginButton}>Entrar</button>
          <span>Não tem conta? <Link to="/register">Crie uma conta</Link></span>
        </form>
      </div>
    </div>
  );
}
