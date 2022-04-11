import React from "react";
import "../STYLES/home.modules.css";
import IMG from "../IMG/img.png";
import invite from "../IMG/invite.gif";
import config from "../IMG/configurar.gif";
import response from "../IMG/responderPreguntas.gif";

function Instructions() {
  return (
    <div className="cards">
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
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
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={IMG} className="d-block w-100" alt="IMG" />
            <div className="carousel-caption d-none d-md-block">
              <img src={invite} height={200} alt="invitar"/>
              <h5>Invita a tus amigos</h5>
              <p>
                Comparte el link de la sala con tus amigos y diviértete.
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={IMG} className="d-block w-100" alt="IMG" />
            <div className="carousel-caption d-none d-md-block">
            <img src={config} height={200} alt="configurar"/>
              <h5>Configura una partida a tu gusto</h5>
              <p>
                Personaliza la partida a tu gusto, cambiando la cantidad de preguntas, dificultad o categorías.
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={IMG} className="d-block w-100" alt="IMG" />
            <div className="carousel-caption d-none d-md-block">
            <img src={response} height={200} alt="responder"/>
              <h5>Responde preguntas</h5>
              <p>
                Responde a preguntas aleatorias de diversas categorías, antes de que se te acabe el tiempo.
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
