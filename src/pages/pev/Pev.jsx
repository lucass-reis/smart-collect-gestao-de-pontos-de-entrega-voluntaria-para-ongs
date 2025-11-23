import React, { useEffect, useState } from "react";
import styles from "./Pev.module.css";
import Header from "../../components/Header/Header"; // Navbar original
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../firebase/firebase.js';
import { PevItem } from "../../components/pevIten/PevItem.jsx";


export default function Pev() {
  const [ongs, setOngs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOngs() {
      try {
        const ongRef = collection(db, "ongs");
        const querySnapshot = await getDocs(ongRef);

        const lista = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOngs(lista);
      } catch (err) {
        console.error("Erro ao carregar ONGs:", err);
      } finally {
        setLoading(false);
      }
    }

    loadOngs();
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingScreen}>
        <p>Carregando ONGs...</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Header /> {/* Navbar original */}

      <section className={styles.banner}>
        <div className={styles.bannerContent}>
          <h2>Conheça as ONGs Parceiras</h2>
          <p>Veja informações, missão, pontos de coleta e como ajudar diretamente.</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {ongs.map((ong, index) => (
              <div key={index} className={styles.card}>
                <h3 className={styles.cardTitle}>{ong.name || "Nome não cadastrado"}</h3>
                <p className={styles.descricao}>{ong.descricao || ""}</p>

                <div className={styles.row}>
                  <div className={styles.infoBlock}>
                    <h4>Missão</h4>
                    <p>{ong.mission || 'Missão não definida'}</p>
                  </div>
                </div>

                <div className={styles.contactInfo}>
                  <p>📞 {ong.phone || "Contato não cadastrado"}</p>
                  <p>✉️ {ong.email || "Email não cadastrado"}</p>
                  <p>📍 Pontos de coleta:</p>
                  <ul>
                    {ong.pevs?.map((ref, i) => (
                        <PevItem key={i} ref={ref} />
                      ))
                    }
                  </ul>
                </div>

                {ong.website && (
                  <div className={styles.socials}>
                    <a href={ong.website} target="_blank" rel="noreferrer">Site</a>
                  </div>
                )}

           
              </div>
            ))}
          </div>
          <div style={{ height: "100px" }}></div>
        </div>
      </section>
    </div>
  );
}
