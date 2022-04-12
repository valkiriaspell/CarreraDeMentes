import React, { useEffect, useState } from "react";
import axios from "axios";
import TimerGame from "./timeGame";
import Animals from "../IMG/game.gif";
import { useSelector } from "react-redux";
import useChatSocketIo from "../PRE-GAMEROOM/useSocketIo";
import { findDOMNode } from "react-dom";
import $ from "jquery";

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

function Game({ setShowEndGame }) {
  const elementRef = React.useRef(null);
  const { preRoomUsers, user } = useSelector((state) => state);
  const { positions, allStartGame, everybodyPlays } = useChatSocketIo(
    preRoomUsers?.id
  );

  // ======= QUESTIONS =======  //

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
  let [pointsPower, setPointsPower] = useState(1);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preRoomUsers.questions]);

  //  ============================
  let finalGame = preRoomUsers?.time * preRoomUsers?.questionAmount * 1000;
  useEffect(() => {
    setTimeout(() => {
      setShowEndGame(true);
    }, finalGame);
  }, []);

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
        setAnswerUser("");
        setPointsPower(1);
        resetColor();
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

  useEffect(() => {
    everybodyPlays && startGame();
  }, [everybodyPlays]);

  const handlePoints = (q) => {
    setAnswerUser(() => q);

    if (q === answer) {
      let point = seconds * pointsPower;
      const pointsTotal = points + point;
      setPoints(pointsTotal);
      positions(user.id, pointsTotal, point, user.name);
    } else {
      console.log("Fallaste");
    }

    let buttons = document.querySelectorAll("#buttons");
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].defaultValue === answer) {
        $(buttons[i]).css("background", "rgba(117, 226, 71, 0.71");
        $(buttons[i]).css("color", "white");
      } else {
        $(buttons[i]).css("background", "rgba(251, 89, 89, 0.71)");
        $(buttons[i]).css("color", "white");
      }
    }
  };

  const resetColor = () => {
    let buttons = document.querySelectorAll("#buttons");
    $(buttons).css("background", "rgba(254, 254, 254, 0.71)");
    $(buttons).css("color", "black");
  }

  const powerDelete = (number) => {
    let buttons = document.querySelectorAll("#buttons");
    
     if (number === 1) {
      for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].defaultValue === false1) {
          $(buttons[i]).css("background", "rgba(251, 89, 89, 0.71)");
          $(buttons[i]).css("color", "white");
        } 
      }
     } else {
       for (let i = 0; i < buttons.length; i++) {
         if (buttons[i].defaultValue === false2 || buttons[i].defaultValue === false3) {
           $(buttons[i]).css("background", "rgba(251, 89, 89, 0.71)");
           $(buttons[i]).css("color", "white");
         } 
       }
     }
  }
  

  return (
    <div>
      {active === true ? (
        <div className="loadingGif">
          <img src={Animals} alt="Animals" width={300} />
          {user.host === true ? (
            <button className="buttonStart" onClick={allStartGame}>
              START
            </button>
          ) : (
            <h6
              style={{ color: "rgba(221, 221, 221, 0.829)" }}
            >{`Esperando a que ${preRoomUsers.name} inicie la partida...`}</h6>
          )}
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
                        disabled={answerUser.length > 0}
                        id="buttons"
                        onClick={() => handlePoints(q.data)}
                        type="button"
                        value={q.data}
                      />
                    </form>
                  );
                })}
            </div>
            <div>
            <button onClick={() => powerDelete(1)}>Poder1</button>
            <button onClick={() => powerDelete(2)}>Poder2</button>
            <button onClick={() => setPointsPower(2)}>Poder3</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Game;
