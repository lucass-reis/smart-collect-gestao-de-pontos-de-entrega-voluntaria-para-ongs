import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { useEffect, useState } from 'react';
import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/Header/Header';
import organograma from './assets/organograma-smartcollect.svg';
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase/firebase";
import { PevItem } from "./components/pevIten/PevItem";
import santos from "./assets/santos.png"

function App() {
  const [ongs, setOngs] = useState([]);
  
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
        }
      }
  
      loadOngs();

      const sections = document.querySelectorAll('.section');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('active', entry.isIntersecting);
        });
      }, { threshold: 0.3 });

      sections.forEach((section) => observer.observe(section));
    }, []);

  return (
    <div className="App">
      {/* Cabeçalho */}
      <Header>
        <li><a href="#contato">Contato</a></li>
        <li><a href="#pev">Encontre um PEV</a></li>
      </Header>

      {/* Seção de Introdução */}
      <section className="intro section">
        <div className="intro-text">
          <h1>Revolucione as doações com IoT</h1>
          <p>Smart Collect otimiza o fluxo de doações e transforma a gestão das ONGs usando a tecnologia de Internet das Coisas.</p>
          <div className="login-section">
            <p style={{
              marginBottom: "0"
            }}>É uma ONG?</p>
            <a href="/login" className="cta-button">Junte-se a nós</a>
          </div>
        </div>
      </section>

      {/* Seção Sobre */}
      <section id="sobre" className="about section">
        <div className="container explication">
          <div>
            <h2>O que é o Smart Collect?</h2>
            <p>O Smart Collect é uma plataforma baseada em IoT que transforma a maneira como as ONGs monitoram e gerenciam pontos de coleta de doações. Com sensores inteligentes, nosso sistema permite acompanhamento em tempo real da ocupação dos pontos de coleta, tornando o processo mais eficiente e transparente.</p>
          </div>
          {/* <img src="https://via.placeholder.com/600x400" alt="Imagem explicativa" className="about-img" /> */}
          <img src={organograma} alt="Imagem explicativa" />
        </div>
      </section>

      {/* Seção de Características */}
      <section id="caracteristicas" className="features section">
        <div className="container">
          <h2>Por que escolher o Smart Collect?</h2>
          <div className="features-list">
            <div className="feature">
              <h3>Monitoramento em Tempo Real</h3>
              <p>Acompanhamento contínuo da ocupação dos pontos de coleta, garantindo a eficiência logística.</p>
            </div>
            <div className="feature">
              <h3>Automação Inteligente</h3>
              <p>Automatização do processo de coleta, notificando as ONGs quando os pontos atingem sua capacidade.</p>
            </div>
            <div className="feature">
              <h3>Transparência e Impacto</h3>
              <p>Melhore a transparência do processo de doações, aumentando o engajamento da comunidade.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Depoimentos */}
      <section id="depoimentos" className="testimonials section">
        <div className="container">
          <h2>O que dizem nossos parceiros</h2>
          <div className="testimonial-slider">
            <div className="testimonial">
              <p>"O Smart Collect transformou nossa logística de coleta. Agora, podemos agir com rapidez e eficiência."</p>
              <span>- ONG Esperança</span>
            </div>
            <div className="testimonial">
              <p>"A automação e o monitoramento em tempo real fizeram toda a diferença na nossa operação. Recomendamos fortemente!"</p>
              <span>- Rede de Solidariedade</span>
            </div>
            <div className="testimonial">
              <p>"Com o Smart Collect, conseguimos monitorar e otimizar a coleta em tempo real, aumentando o engajamento da comunidade."</p>
              <span>- Cidadania Ativa</span>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de encontre um PEV */}
      <section id="pev" className="find-a-pev section">
        <div className="container">
          <h2>Encontre um PEV de uma ONG parceira!</h2>
          <div className="page">
              <div className="container">
                <div className="grid">
                  {ongs.map((ong, index) => (
                    <div key={index} className="card">
                      <div className="ong-logo">
                        <img src={ong.profileImage 
                          ? `http://localhost:3001/uploads/${ong.profileImage}`
                          : santos
                        }/>
                      </div>
                      <div className="content">
                        <h3 className="cardTitle">{ong.name || "Nome não cadastrado"}</h3>
                        <p className="descricao">{ong.descricao || ""}</p>
        
                        <div className="row">
                          <div className="infoBlock">
                            <h4>Missão</h4>
                            <p>{ong.mission || 'Missão não definida'}</p>
                          </div>
                        </div>
        
                        <div className="contactInfo">
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
                          <div className="socials">
                            <a href={ong.website} target="_blank" rel="noreferrer">Site</a>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ height: "100px" }}></div>
              </div>
          </div>
        </div>
      </section>

      {/* Seção de Contato */}
      <section id="contato" className="contact section">
        <div className="container">
          <h2>Entre em contato</h2>
          <form>
            <input type="text" placeholder="Seu nome" required />
            <input type="email" placeholder="Seu e-mail" required />
            <textarea placeholder="Sua mensagem" required></textarea>
            <button type="submit">Enviar</button>
          </form>
        </div>
      </section>

      {/* Rodapé */}
      <Footer/>
    </div>
  );
}

export default App;
