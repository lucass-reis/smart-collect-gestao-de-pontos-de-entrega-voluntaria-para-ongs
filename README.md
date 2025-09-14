# <img src="src/assets/logo_horizontal.png" alt="Logo do SmartCollect" width="600">

Projeto Integrador desenvolvido para implementar um **Ponto de Entrega Voluntária Inteligente (PEV)**.  
O sistema utiliza sensores ultrassônicos e um ESP32 para medir a porcentagem de preenchimento de coletores, exibindo os dados em um display OLED e enviando-os em tempo real para o **Firebase Realtime Database**.  

A solução tem como objetivo **apoiar ONGs** no gerenciamento de pontos de coleta, ao mesmo tempo em que engaja doadores, permitindo que verifiquem se os pontos estão ativos e recebendo doações.

---

## 🎯 Objetivos

O **SmartCollect IoT** busca tornar os Pontos de Entrega Voluntária mais **eficientes e transparentes**, permitindo:

- 📊 Monitoramento em tempo real da **ocupação dos coletores**  
- 🌍 Integração com uma **Plataforma Web** para gestão dos pontos pelas ONGs  
- 🙌 Engajamento dos doadores, que podem visualizar pontos ativos e em funcionamento  

---

## 👨‍👩‍👧‍👦 Público-Alvo
- ONGs → Gerenciar pontos de coleta com mais eficiência
- Doadores → Acompanhar a atividade dos pontos em tempo real
- Comunidade → Incentivo à cultura de doação e reaproveitamento

---

## Funcionalidades  

### 🔹 Monitoramento em tempo real  
Sensores ultrassônicos instalados nos coletores acompanham continuamente o nível de resíduos.  

### 🔹 Dashboard interativo  
Interface web para exibição de indicadores, relatórios e gráficos comparativos.  

### 🔹 Notificações inteligentes  
Alertas automáticos são enviados quando a coleta é necessária, evitando deslocamentos desnecessários.  

### 🔹 Sustentabilidade  
A solução promove práticas ecológicas em consonância com políticas de cidades inteligentes.  

---

## Tecnologias Utilizadas  
<div align="center">
  <img src="https://skillicons.dev/icons?i=html,css,js,react,nodejs,firebase,arduino,cpp,git,github" />
  
  <br>

  | **Camada**          | **Tecnologias**                                      |
  |----------------------|-----------------------------------------------------|
  | **Front-end**        | HTML · CSS · JavaScript · React.js                  |
  | **Back-end**         | NodeJS                                              |
  | **Banco de Dados**   | Firebase Firestore e Realtime                       |
  | **IoT**              | Sensores ultrassônicos · Microcontrolador ESP32     |
  | **Versionamento**    | Git · GitHub                                        |
</div>


---

## 🌐 Dispositivo (IoT)

A branch do Dispositivo que hospeda o IoT está disponível no seguinte link:  

👉 [Acessar Branch do IoT](https://github.com/fatec-zona-leste/smart-collect-gestao-de-pontos-de-entrega-voluntaria-para-ongs/tree/iot)

---

## 🎬 Demonstrações  

Exemplo de protótipo de dashboard:  
<p align="center">
  <img src="https://img.shields.io/badge/Demo-Em%20Breve-lightgrey?style=for-the-badge"/>
</p>  

<p align="center">
  <img src="https://dummyimage.com/700x400/cccccc/000000.png&text=Exemplo+Dashboard" alt="Exemplo Dashboard"/>
</p>  

---

## 🛠️ Requisitos

- Node.js **22.13**
- IDE (Visual Studio Code e etc...)  
- Firebase Auth, Firestore e Realtime Configurado
- Keys das APIs necessárias

---

## 📂 Estrutura do Repositório

```bash
smart-collect-ui/
│
├── assets/                   # Contém todas as logos e ícones do SmartCollect
├── circuit/                  # Contém arquivos Fritzing e diagramas de todos os componentes eletrônicos
├── examples/                 # Arquivos de teste para cada Função do projeto
├── libraries/                # Bibliotecas externas utilizadas
├── docs/                     # Documentação complementar
├── smart-collect-iot-code/   # Código fonte da aplicação em C++
├── .gitignore            # Arquivo de configuração do Git para ignorar arquivos de environments
├── LICENSE.txt               # Licença atribuída ao repositório
├── platformio.txt            # Arquivo de docuymentação das configurações utilizadas para rodar o projeto
└── README.md                 # Arquivo de explicação do projeto
```

---

## 🛠️ Como Usar

1. Clone este repositório:
   
```bash
   git clone https://github.com/fatec-zona-leste/smart-collect-gestao-de-pontos-de-entrega-voluntaria-para-ongs.git
```

2. Abra o projeto na sua IDE.
3. Instale as dependências do Node:
```bash
   npm install
```
4. Rode o projeto em ambiente de desenvolvimento com o script NPM:
```bash
   npm run dev
```

---

## 📌 Status do Projeto
> 🚧 Em desenvolvimento – Versão inicial da UI

---

## 📜 Licença
> Este projeto é distribuído sob a licença GPL-3.0. Consulte o arquivo [LICENCE](LICENSE.txt)
 para mais detalhes.

---

## 👥 Colaboradores

<div align="center">
<table>
  <tr>
    <td align="center" width="200">
      <img src="https://github.com/user-attachments/assets/c5cf0acd-8137-43b2-a02c-5d395ddd17fe" width="100px" style="border-radius:50%;" alt="Gabriel Mendes"/><br/>
      <b>Gabriel Mendes</b><br/>
      <a href="https://www.linkedin.com/in/victorncardoso/">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" width="20"/>
      </a>
      <a href="https://github.com/gabrielMendes21">
        <img alt="image" src="https://github.com/user-attachments/assets/4612c60a-9113-4dba-9329-9d2cb7cf514f" width="20"/>
      </a>
    </td>
    <td align="center" width="200">
      <img src="https://github.com/user-attachments/assets/a3fefd4c-f6eb-4a3f-8c0c-e26e2524886e" width="100px" style="border-radius:50%;" alt="Juan Farias da Rocha"/><br/>
      <b>Juan Farias da Rocha</b><br/>
      <a href="https://www.linkedin.com/in/juan-farias-da-rocha">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" width="20"/>
      </a>
      <a href="https://github.com/juan9321">
        <img alt="image" src="https://github.com/user-attachments/assets/4612c60a-9113-4dba-9329-9d2cb7cf514f" width="20"/>
      </a>
    </td>
    <td align="center" width="200">
      <img src="https://github.com/user-attachments/assets/02531667-4b8a-40be-a1ec-fe5af32bf976" width="100px" style="border-radius:50%;" alt="Victor Cardoso"/><br/>
      <b>Victor Cardoso</b><br/>
      <a href="https://www.linkedin.com/in/victorncardoso/">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" width="20"/>
      </a>
      <a href="https://github.com/vek03">
        <img alt="image" src="https://github.com/user-attachments/assets/4612c60a-9113-4dba-9329-9d2cb7cf514f" width="20"/>
      </a>
    </td>
  </tr>
</table>
</div>

<br>

<p align="center">  
  <sub>© 2025 Smart Collect — Todos os direitos reservados</sub>  
</p>
