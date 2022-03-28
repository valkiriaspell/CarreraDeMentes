import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import EditProfile from './components/HOME/editProfile';

function App() {
  return (
    <div className="App">
        {/* <Route path="/" component={lading} /> */}
        {/* <Route path="/" component={login} /> */}
        {/* <Route path="/" component={registro} /> */}
        {/* <Route path="/" component={home} /> */}
        <Route path="/editProfile" component={EditProfile} />
    </div>
  );
}

export default App;
