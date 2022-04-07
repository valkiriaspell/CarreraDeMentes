import React, { useEffect, useState } from "react";
import axios from "axios";
import TimerGame from "./timeGame";
import Animals from "../IMG/game.gif";
import Swal from "sweetalert2";

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
  var m1 = Math.floor((Math.random() * array.length) % array.length);

  var m2 = Math.floor((Math.random() * array.length) % array.length);
  while (m2 === m1) {
    m2 = Math.floor((Math.random() * array.length) % array.length);
  }

  var m3 = Math.floor((Math.random() * array.length) % array.length);
  while (m3 === m1 || m3 === m2) {
    m3 = Math.floor((Math.random() * array.length) % array.length);
  }

  var m4 = Math.floor((Math.random() * array.length) % array.length);
  while (m4 === m1 || m4 === m2 || m4 === m3) {
    m4 = Math.floor((Math.random() * array.length) % array.length);
  }

  var attacks = [array[m1], array[m2], array[m3], array[m4]];

  return attacks;
}

const config = [
  {
    count: 10,
    category: "Musica",
    time: 20,
  },
];

function Game({ preRoomUsers }) {
  // ======= QUESTIONS =======
  const [questions, setQuestions] = useState([]);

  let [question, setQ] = useState("Question");
  let [answer, setA] = useState("");
  let [false1, setF1] = useState("");
  let [false2, setF2] = useState("");
  let [false3, setF3] = useState("");
  let [image, setImage] = useState("");
  let [category, setCat] = useState("");
  let [respuestas, setRespuestas] = useState([]);
  let [answerUser, setAnswerUser] = useState("");
  let [points, setPoints] = useState(0);

  // ======= TIMER =======
  const [seconds, setSeconds] = useState(config[0].time);
  const [percentage, setPercentage] = useState(100);
  const [active, setActive] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      let resta = Math.floor(percentage / seconds);
      setPercentage(percentage - resta);
    }, 1000);
  }, [setPercentage, percentage, seconds]);

  if (percentage <= 0) {
    setPercentage(100);
  }
  if (seconds <= 0) {
    setSeconds(config[0].time);
  }
  useEffect(() => {
    let intervalo = null;
    intervalo = setInterval(() => {
      setSeconds((seconds) => seconds - 1);
    }, 1000);

    return () => clearInterval(intervalo);
  }, [question]);
  //  ============================

  useEffect(() => {
    getUrl("http://localhost:3001/question").then((res) => {
      setQuestions(res.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setQuestions]);

 

  let secondsGame = config[0].time + "000";
  const startGame = () => {
    setQ(questions[0].question);
    setA(questions[0].answer);
    setF1(questions[0].false1);
    setF2(questions[0].false2);
    setF3(questions[0].false3);
    setCat(questions[0].category);
    console.log("entre")

    questions?.map((q, index) =>
      setTimeout(() => {
        setQ(q.question);
        setA(q.answer);
        setF1(q.false1);
        setF2(q.false2);
        setF3(q.false3);
        setCat(q.category);
        setImage(q.image);
        setSeconds(config[0].time);
        setRespuestas(
          randomQuestions([
            { data: q.answer },
            { data: q.false1 },
            { data: q.false2 },
            { data: q.false3 },
          ])
        );
      }, secondsGame * index)
    );
  };

  function handlePoints(q) {
    setAnswerUser(q);
    if (answerUser !== "") {
      if (answerUser === answer) {
        const pointsTotal = points + seconds;
        setPoints(pointsTotal);
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Acertaste",
          heightAuto: false,
          showConfirmButton: false,
          width: 300,
          timer: 1500,
        });
        console.log(points);
      } else {
        console.log("Fallaste");
        console.log(points);
      }
      setAnswerUser("");
    }
  }

  return (
    <div>
      {active === true ? (
        <div className="loadingGif">
          <img src={Animals} alt="Animals" width={300} />
          <button className="buttonStart" onClick={startGame}>
              START
            </button>
        </div>
      ) : (
        <div className="containerGame">
          <div className="contentNav">
            <TimerGame seconds={seconds} percentage={percentage} />
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
              {respuestas &&
                respuestas.map((q, index) => {
                  return (
                    <form key={index}>
                      <input
                        onClick={() => handlePoints(q.data)}
                        type="button"
                        value={q.data}
                      />
                    </form>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Game;
