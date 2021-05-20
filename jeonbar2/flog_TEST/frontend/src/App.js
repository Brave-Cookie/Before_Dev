import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './views/Home';
import Login from './views/Login';
import Signup from './views/Signup';
import Mypage from './views/Mypage';
import Project from './views/Project'

// jeonbar
import test from './views/test'


const App = () => {

  

  return (
    <BrowserRouter>
    <div className="App">

      <div className="content">

          <Route path="/" component={ Home } exact />
          <Route path="/login" component={ Login } exact />
          <Route path="/signup" component={ Signup } exact />
          <Route path="/mypage/:userId" component={ Mypage } exact />
          <Route path="/prject/:projectId" component={ Project } exact />

          {/* jeonbar */}
          <Route path="/test" component={ test } exact />

      </div>
    </div>
    </BrowserRouter>
  );
  
}
export default App;
