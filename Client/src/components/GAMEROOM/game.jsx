import React, { useEffect, useState } from "react";
import axios from "axios";

// let arrayQuestions = [
//   {
//     id: 190,
//     question: "¿Cuál es el río más largo del mundo?",
//     answer: "Nilo",
//     false1: "Estigio",
//     false2: "Amazonas",
//     false3: "Yangtze",
//     category: "Ciencias",
//     image: "https://miro.medium.com/max/12000/1*7_uKivvq6-GH_eT1e714jw.jpeg",
//   },
//   {
//     id: 191,
//     question: "¿Quién ganó cuatro mundiales consecutivos de Fórmula 1?",
//     answer: "Sebastián Vettel",
//     false1: "Lewis Hamilton",
//     false2: "Max Verstappen",
//     false3: "Fernando Alonso",
//     category: "Deportes",
//     image:
//       "https://amaxofilia.com/wp-content/uploads/2020/05/quien-gana-y-quien-pierde-con-el-cambio-de-reglas-en-la-f1-1280x720.jpg",
//   },
//   {
//     id: 192,
//     question: "¿A qué estilo corresponde la Catedral de Notre Dame de París?",
//     answer: "Gótico",
//     false1: "Barroco",
//     false2: "Románico",
//     false3: "Renacentista",
//     category: "Arte",
//     image: "https://static.dw.com/image/48695376_101.jpg",
//   },
//   {
//     id: 193,
//     question: "¿Cuál era la moneda utilizada en España antes del euro?",
//     answer: "Pezeta",
//     false1: "Dolar",
//     false2: "Yen",
//     false3: "Libra",
//     category: "Historia",
//     image:
//       "https://larepublica.pe/resizer/5HAyXhfwk5vNuKq115r71XyPIwA=/1250x735/top/smart/arc-anglerfish-arc2-prod-gruporepublica.s3.amazonaws.com/public/RRP3OVWVKNBBZI43H3645PUYDI.jpg",
//   },
//   {
//     id: 194,
//     question: "¿Qué es el tomate para los botánicos?",
//     answer: "Fruta",
//     false1: "Verdura",
//     false2: "Tuberculo",
//     false3: "Hortaliza",
//     category: "Ciencias",
//     image:
//       "https://s3-us-west-1.amazonaws.com/contentlab.studiod/getty/246623d990be42b7a60270fc0e188750.jpg",
//   },
// ];

async function getUrl(url) {
  return await axios
    .get(url)
    .then((result) => result)
    .then((response) => {
      return response;
    });
}

function randomQuestions(array) {
  var m = array.length,
    t,
    i;

  while (m) {
    i = Math.floor(Math.random() * m--);

    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

function Game() {
  const [questions, setQuestions] = useState([]);

  let [question, setQ] = useState("Question");
  let [answer, setA] = useState("");
  let [false1, setF1] = useState("");
  let [false2, setF2] = useState("");
  let [false3, setF3] = useState("");
  let [image, setImage] = useState("");
  let [category, setCat] = useState("");

  const config = [
    {
      count: 15,
      category: "Musica",
    },
  ];

  function sliceQuestions(array) {
    let data = randomQuestions(array);
    return data.slice(0, config[0].count);
  }

  useEffect(() => {
    getUrl("http://localhost:3001/question").then((res) => {
      let data = sliceQuestions(res.data);
      setQuestions(data);
      console.log(data);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setQuestions]);

  const startGame = () => {
    setQ(questions[0].question);
    setA(questions[0].answer);
    setF1(questions[0].false1);
    setF2(questions[0].false2);
    setF3(questions[0].false3);
    setCat(questions[0].category);

    questions?.map((q, index) =>
      setTimeout(() => {
        setQ(q.question);
        setA(q.answer);
        setF1(q.false1);
        setF2(q.false2);
        setF3(q.false3);
        setCat(q.category);
        setImage(q.image);
      }, 10000 * index)
    );
  };

  return (
    <div className="containerGame">
      <div className="categoryQuestion">
        <h3>{category}</h3>
      </div>
      <div className="question">
        <span>{question}</span>
      </div>
      <div className="imageQuestion">
        <img src={image} alt="Imagen" />
      </div>
      <div>
        <div className="contentQuestions">
          <button>{answer}</button>
          <button>{false2}</button>
          <button>{false3}</button>
          <button>{false1}</button>
        </div>
        <button className="buttonStart" onClick={startGame}>
          START
        </button>
      </div>
    </div>
  );
}

export default Game;
