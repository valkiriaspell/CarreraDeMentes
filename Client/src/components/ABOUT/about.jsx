import Title from "react-vanilla-tilt";
import "../STYLES/about.modules.css";
import Location from "../IMG/pin.png";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

const arrayIntegrantes = [
  {
    img: "https://avatars.githubusercontent.com/u/81522778?v=4",
    nombre: "Valkiria Salerno",
    GitHub: "https://github.com/valkiriaspell",
    Linkedin: "https://www.linkedin.com/in/valkiria-salerno-9860a6164/",
    Location: "Santiago del Estero, Argentina",
  },
  {
    img: "https://avatars.githubusercontent.com/u/88063168?v=4",
    nombre: "Eduardo Abelardo",
    GitHub: "https://github.com/eduabelardo",
    Linkedin: "https://www.linkedin.com/in/eduardo-andres-abelardo/",
    Location: "Rosario, Argentina",
  },
  {
    img: "https://avatars.githubusercontent.com/u/93488140?v=4",
    nombre: "Ornella Irigo",
    GitHub: "https://github.com/orneirigo",
    Linkedin: "https://www.linkedin.com/in/ornella-irigo/",
    Location: "Córdoba, Argentina",
  },
  {
    img: "https://avatars.githubusercontent.com/u/91911135?v=4",
    nombre: "Matias Montini",
    GitHub: "https://github.com/Matiasmo97",
    Linkedin: "https://www.linkedin.com/in/matias-montini-fullstack-dev/",
    Location: "La Rioja, Argentina",
  },
  {
    img: "https://avatars.githubusercontent.com/u/93883880?v=4",
    nombre: "Matias Beier",
    GitHub: "https://github.com/matiasbeier",
    Linkedin: "https://www.linkedin.com/in/matias-beier-dev/",
    Location: "Buenos Aires, Argentina",
  },
  {
    img: "https://avatars.githubusercontent.com/u/88675183?v=4",
    nombre: "Ignacio Martinez",
    GitHub: "https://github.com/Nach02",
    Linkedin: "https://www.linkedin.com/in/ignacio-martinez-iglesias/",
    Location: "Mendoza, Argentina",
  },
  {
    img: "https://avatars.githubusercontent.com/u/55298236?v=4",
    nombre: "Marcos Davila",
    GitHub: "https://github.com/MarcosDavila1",
    Linkedin: "https://www.linkedin.com/in/marcosdavila2/",
    Location: "Entre Ríos, Argentina",
  },
  {
    img: "https://avatars.githubusercontent.com/u/87210402?v=4",
    nombre: "Leandro Verón",
    GitHub: "https://github.com/leandroveroninf",
    Linkedin: "https://www.linkedin.com/in/leandro-ver%C3%B3n-3b1118204/",
    Location: "Entre Ríos, Argentina",
  },
];

function shuffle(array) {
  var m = array.length,
    t,
    i;

  // While there remain elements to shuffle...
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

export default function About() {
  const [integrantes, setIntegrantes] = useState([]);

  const history = useHistory();
  const goingBack = () => {
    history.goBack();
  };
  const options = {
    max: 30,
    scale: 2.0,
    speed: 2000,
    color: "red"
  };

  useEffect(() => {
    setIntegrantes(shuffle(arrayIntegrantes));
  }, []);

  return (
    <div>
      <div className="navAbout">
        <button
          onClick={() => goingBack()}
          className="buttonSides brown volverAbout"
        >
          Volver
        </button>
        <img
          className="logoAbout"
          width="340px"
          src="https://firebasestorage.googleapis.com/v0/b/carreradementes-773d8.appspot.com/o/logotipos%2Flogo-jungla.png?alt=media&token=56d936a4-646a-4ef4-ae78-e635f8a5a9c4"
          alt="Logo"
        ></img>
        <div></div>
      </div>
      <div className="containerAbout">
        {integrantes.map((i) => {
          return (
            <div>
              <Title style={{backgroundColor: "rgba(11, 11, 11, 0.388)", height: "21rem", borderRadius: "0.4rem"}} options={options}>
                <div className="contentAbout" key={i.nombre}>
                  <div>
                    <img
                      className="imgAbout"
                      src={i.img}
                      alt="img"
                      width={180}
                    />
                  </div>
                  <div>
                    <span style={{marginTop: "0.6rem"}} className="nameAbout">{i.nombre}</span>
                  </div>
                  <div>
                    <img src={Location} alt="Location" width={30} />{" "}
                    {i.Location}
                  </div>
                  <div className="containerRedes">
                    <a target="_blank" href={i.GitHub} rel="noreferrer">
                      <i class="bx bxl-github github"></i>
                    </a>
                    <a href={i.Linkedin} target="_blank" rel="noreferrer">
                      <i class="bx bxl-linkedin-square linkedin"></i>
                    </a>
                  </div>
                </div>
              </Title>
            </div>
          );
        })}
        <Title style={{backgroundColor: "rgba(11, 11, 11, 0.388)", height: "21rem", borderRadius: "0.4rem"}} className="tilt" options={options}>
          <div  className="contentAbout">
            <div>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/carreradementes-773d8.appspot.com/o/Dise%C3%B1ador%2Fe83aa064-dcac-43fc-bf49-b9d345213d2b.jpg?alt=media&token=e510830a-5945-4ae5-ae5c-1b5e16988115"
                alt="Perfil"
                width={200}
                height={210}
                style={{borderRadius: "50%", marginBottom: "0.6rem"}}
              />
            </div>
            <div>
              <span className="nameAbout">Pol Basaguren</span>
            </div>
            <div>
            <span><img src={Location} alt="Location" width={30} />{" "}Rosario, Argentina</span>
            </div>
            <div>
              <a target="_blank"  href="https://instagram.com/polbasaguren?igshid=YmMyMTA2M2Y=" rel="noreferrer"><i class='bx bxl-instagram-alt instagram'></i></a>
            </div>
          </div>
        </Title>
      </div>
    </div>
  );
}
