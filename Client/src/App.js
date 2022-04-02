import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import EditProfile from './components/HOME/editProfile';
import GameListRoom from './components/GAME-LIST-ROOM/gameListRoom';
import FormAddQuestions from './components/HOME/FormAddQuestions/form';
import Home from './components/HOME/home';
import PlayStore from './components/PLAYSTORE/playstore';
import PreGameRoom from './components/PRE-GAMEROOM/preGameRoom';
import { config } from './utils/Firebase';
import { initializeApp } from 'firebase/app';
import initialPage from './components/INICIO/initialPage';
import signUpFirebase from './components/INICIO/SIGNUP/signUpFirebase';
import LandingPage from './components/LANDINGPAGE/landingPage';
import GameRoom from './components/GAMEROOM/gameRoom';
import RecuperarContrasena from './components/INICIO/RECUPERARCONTRASENA/recuperarContrasena';

initializeApp(config)


function App() {
  return (
    <div className="App">
        <Route exact path="/" component={LandingPage} />
        <Route path="/home" component={Home} />
        <Route path="/login" component={initialPage} />
        <Route path="/signup" component={signUpFirebase} />
        <Route path="/recuperarcontrasena" component={RecuperarContrasena} />
        <Route path="/editProfile" component={EditProfile} />
        <Route path="/room/:idUser" component={PreGameRoom} />
        <Route path="/partidasDisponibles" component={GameListRoom} />
        <Route path="/tienda" component={PlayStore} />
        <Route path="/añadirPregunta" component={FormAddQuestions} />
        <Route path="/partida" component={GameRoom} />
    </div>
  );
}

export default App;
