import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../../utils/auth.js';
import styles from './CollectionStatus.module.css';
import { database } from '../../firebase/firebase.js';
import { get, onValue, ref } from 'firebase/database';

export default function CollectionStatus() {
  const [isLoading, setIsLoading] = useState(true);
  const [pevFillPercentage, setPevFillPercentage] = useState(0);
  const navigate = useNavigate();

  const location = useLocation();
  const point = location.state?.point; // Aqui está o objeto completo

  useEffect(() => {
    setIsLoading(true);
    const dbRef = ref(database);

    const unsubscribe = onValue(
      dbRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const pevStatusId = Object.keys(data).find((k) => k === point.PEVId);

          if (pevStatusId) {
            setPevFillPercentage(data[pevStatusId].fillPercentage.toFixed(2) || 0);
          } else {
            setPevFillPercentage(0);
          }
        } else {
          console.log("Nenhum dado encontrado.");
          setPevFillPercentage(0);
        }
        setIsLoading(false);
      },
      (error) => {
        console.error(error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe(); // remove o listener quando o componente desmonta
  }, [point.PEVId, database]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleViewAllPoints = () => navigate('/collection-points');
  const handleProfile = () => navigate('/view-profile'); // Novo link para perfil

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Carregando status...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 onClick={handleViewAllPoints} className={styles.headerTitle}>Smart Collect</h1>
        <div className={styles.headerActions}>
          <button onClick={handleProfile} className={styles.logoutButton}>
            Perfil
          </button>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Sair
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.statusCard}>
          <div className={styles.pointCard}>
            <button className={styles.deleteButton}>
              &#128465;
            </button>
            {/* ...restante do card... */}
          </div>
          <div className={styles.percentageContainer}>
            <div className={styles.percentageCircle}>
              <svg className={styles.percentageFill} viewBox="0 0 36 36">
                <path
                  className={styles.circleBackground}
                  d="M18 2.0845
                     a 15.9155 15.9155 0 0 1 0 31.831
                     a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#e6e6e6"
                  strokeWidth="3.8"
                />
                <path
                  className={styles.circleProgress}
                  strokeDasharray={`${pevFillPercentage}, 100`}
                  d="M18 2.0845
                     a 15.9155 15.9155 0 0 1 0 31.831
                     a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#4e54c8"
                  strokeWidth="3.8"
                  strokeLinecap="round"
                />
              </svg>
              <div className={styles.percentageText}>
                <span className={styles.percentageNumber}>{pevFillPercentage}%</span>
                <span className={styles.percentageLabel}>preenchido</span>
              </div>
            </div>
          </div>
          <div className={styles.statusInfo}>
            <p className={styles.statusText}>
              Este é o ponto de coleta principal. Acompanhe a taxa de preenchimento em tempo real!
            </p>
          </div>

          <button onClick={handleViewAllPoints} className={styles.viewAllButton}>
            Ver Todos os Pontos
          </button>
          
        </div>
      </main>
    </div>
  );
}
