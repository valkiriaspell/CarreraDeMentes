import React from "react";
import "../STYLES/home.modules.css";
import IMG from "../IMG/img.png";

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
              <h5>Invita a tus amigos</h5>
              <p>
                Comparte el link de la sala con tus amigos y diviertete.
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={IMG} className="d-block w-100" alt="IMG" />
            <div className="carousel-caption d-none d-md-block">
              <h5>Configura una partida a tu gusto</h5>
              <p>
                Personaliza la partida a tu gusto, cambiando la cantidad de preguntas, la dificultad o categotias.
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={IMG} className="d-block w-100" alt="IMG" />
            <div className="carousel-caption d-none d-md-block">
              <h5>Responde preguntas</h5>
              <p>
                Responde preguntas aleatorias sobre las categotias seleccionadas, antes de que s ete acabe el tiempo.
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