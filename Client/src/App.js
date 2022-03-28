import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import { config } from './utils/Firebase';
import { initializeApp } from 'firebase/app';
import initialPage from './components/INICIO/initialPage';
import signUpFirebase from './components/INICIO/SIGNUP/signUpFirebase';

initializeApp(config)

function App() {
  return (
    <div className="App">
        {/* <Route path="/" component={lading} /> */}
        <Route path="/login" component={initialPage} />
        <Route path="/signup" component={signUpFirebase} />
        {/* <Route path="/" component={home} /> */}
        {/* <Route path="/" component={editPerfil} /> */}
    </div>
  );
}

export default App;
