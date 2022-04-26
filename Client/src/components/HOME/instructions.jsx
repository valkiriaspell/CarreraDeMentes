import React from "react";
import "../STYLES/home.modules.css";
import IMG from "../IMG/pergamino2.svg";
import invite from "../IMG/invite.gif";
import config from "../IMG/configurar.gif";
import response from "../IMG/responderPreguntas.gif";
import powers from "../IMG/powers.png";
import nivel from "../IMG/nivel.png";
import moneda from "../IMG/chest.png";
import preguntas from "../IMG/preguntas.png";

function Instructions() {
  return (
    <div className="cards">
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators carruselIndicación">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="3"
            aria-label="Slide 4"
          ></button>
            <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="4"
            aria-label="Slide 5"
          ></button>
            <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="5"
            aria-label="Slide 6"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="6"
            aria-label="Slide 7"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={IMG}  className="d-block w-100 pergamino" alt="IMG" />
            <div className="carousel-caption d-none d-md-block containerCard">
              <img src={response} height={145} alt="response"/>
              <h5>¡Juga a Zooper Trivia!</h5>
              <p>
                Responde a preguntas aleatorias de diversas categorías, antes de que se te acabe el tiempo.
                Cuánto más rápido respondas, ¡más puntos acumulas!
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={IMG} className="d-block w-100" alt="IMG" />
            <div className="carousel-caption d-none d-md-block containerCard">
            <img src={nivel} height={120} alt="nivel"/>
              <h5>¡Sumá puntos de experiencia y subí de Nivel!</h5>
              <p>
                Posicionate en lo más alto de nuestro Top 20 de jugadores.
                Por cada partida ganada, acumulas 100 puntos de experiencia para subir de nivel.
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={IMG} className="d-block w-100" alt="IMG" />
            <div className="carousel-caption d-none d-md-block containerCard">
            <img src={config} height={200} alt="configurar"/>
              <h5>¡Configura una partida a tu gusto!</h5>
              <p>
              En la sección 'Ajustes de Partida' podes seleccionar la cantidad de preguntas, el grado de dificultad y hasta excluír categorías.
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={IMG} className="d-block w-100" alt="IMG" />
            <div className="carousel-caption d-none d-md-block containerCard">
            <img src={invite} height={200} alt="invitar"/>
              <h5>¡Invita a tus amigos!</h5>
              <p>
              Compartí el link de la sala con tus amigos y diviértete.
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={IMG} className="d-block w-100" alt="IMG" />
            <div className="carousel-caption d-none d-md-block containerCard">
            <img className="imgMoneda" src={moneda} height={120} alt="monedas"/>
              <h5>¡Comprá monedas en nuestra Tienda! </h5>
              <p>
              Adquirí las monedas de Zooper Trivia para cambiarlas por poderes y así aumentar tus chances de ganar.
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={IMG} className="d-block w-100" alt="IMG" />
            <div className="carousel-caption d-none d-md-block containerCard">
            <img style={{marginBottom: "15px"}} src={powers} height={140} alt="poderes"/>
              <h5>¡Utiliza tus Poderes! </h5>
              <p>
              Usa tus monedas para eliminar respuestas falsas o multiplicar x2 los puntos ganados al responder una pregunta.
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={IMG} className="d-block w-100" alt="IMG" />
            <div className="carousel-caption d-none d-md-block containerCard">
            <img style={{marginBottom: "15px"}} src={preguntas} height={140} alt="nuevasPreguntas"/>
            <h5>¡Crea Nuevas Preguntas!</h5>
              <p>
              Animate y crea preguntas y respuestas por categorías, para que sean parte de Zooper Trivia.
              </p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default Instructions;
