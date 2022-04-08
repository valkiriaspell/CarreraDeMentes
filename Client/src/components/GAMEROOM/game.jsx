import React, { useEffect, useState } from "react";
import axios from "axios";
import TimerGame from "./timeGame";
import Animals from "../IMG/game.gif";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import useChatSocketIo from "../PRE-GAMEROOM/useSocketIo";

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

function Game() {
  const elementRef = React.useRef(null);
  const { preRoomUsers, user } = useSelector((state) => state);
  const { positions } = useChatSocketIo(preRoomUsers?.id);

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
  const [seconds, setSeconds] = useState(preRoomUsers?.time);
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
    setSeconds(preRoomUsers?.time);
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
    setQuestions(preRoomUsers.questions);
    console.log("Questionsssss" + questions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preRoomUsers.questions]);

  let secondsGame = preRoomUsers?.time + "000";
  const startGame = () => {
    console.log(preRoomUsers.questions);
    setQ(preRoomUsers.questions[0].question);
    setA(preRoomUsers.questions[0].answer);
    setF1(preRoomUsers.questions[0].false1);
    setF2(preRoomUsers.questions[0].false2);
    setF3(preRoomUsers.questions[0].false3);
    setCat(preRoomUsers.questions[0].category);
    setActive(false);
    setAnswerUser("");

    questions?.map((q, index) =>
      setTimeout(() => {
        setQ(q.question);
        setA(q.answer);
        setF1(q.false1);
        setF2(q.false2);
        setF3(q.false3);
        setCat(q.category);
        setImage(q.image);
        setSeconds(preRoomUsers?.time);
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
        let point = seconds;
        const pointsTotal = points + point;
        setPoints(pointsTotal);
        positions(user.id, pointsTotal, point)
      } else {
        elementRef.current.style.color = "rgba(230, 231, 232, 0.539)";
        elementRef.current.style.backgroundColor = "rgba(238, 71, 71, 0.71)";
      }
      setAnswerUser("");
    }
  }

  // if(questions.length === 0){
  //   Swal.fire({
  //     title: 'El Juego termino!',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Volver a Jugar!'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire(
  //         'Volver al Home!',
  //         'Your file has been deleted.',
  //         'success'
  //       )
  //     }
  //   })
  // }

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
                        ref={elementRef}
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
