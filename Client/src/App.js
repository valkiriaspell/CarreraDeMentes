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
import Footer from './components/FOOTER/footer';
import loginAdmin from './components/ADMIN/login';
import AdminNav from './components/ADMIN/adminNav';
import AdminUsers from './components/ADMIN/adminUsers';
import AdminQuestions from './components/ADMIN/adminQuestions';
import CurrentQuestions from './components/ADMIN/currentQuestions';
import JoinWithLink from './components/PRE-GAMEROOM/joinWithLink';
import Privacidad from './components/PRIVACIDAD/privacidad';
import Music from './components/MUSICA/musica';


initializeApp(config);

function App() {
  return (
    <div className='App'>
      <Route path='/' component={Music} />
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/' component={Footer} />
      <Route path='/home' component={Home} />
      <Route path='/home' component={Footer} />
      <Route path='/login' component={initialPage} />
      <Route path='/signup' component={signUpFirebase} />
      <Route path='/recuperarcontrasena' component={RecuperarContrasena} />
      <Route path='/editProfile' component={EditProfile} />
      <Route path='/room/:idUser' component={PreGameRoom} />
      <Route path='/invitationRoom/:idRoom' component={JoinWithLink} />
      <Route path='/partidasDisponibles' component={GameListRoom} />
      <Route path='/tienda' component={PlayStore} />
      <Route path='/añadirPregunta' component={FormAddQuestions} />
      <Route path='/partida' component={GameRoom} />
      <Route path='/politica-de-privacidad' component={Privacidad} />
      <Route exact path="/ranking" component={Ranking} />

      {/* ///////   Secciones de Administrador //////// */}
      <Route path='/administrador' component={loginAdmin} />
      <Route path='/adminHome' component={AdminNav} />
      <Route path='/adminHome/questions' component={AdminQuestions} />
      <Route path='/adminHome/currentQuestions' component={CurrentQuestions} />
      <Route path='/adminHome/users' component={AdminUsers} />
    </div>
  );
}

export default App;
