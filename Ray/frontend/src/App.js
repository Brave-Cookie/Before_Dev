import React, { useState } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './views/Home';
import Login from './views/Login';
import Signup from './views/Signup';


const App = () => {

  //let [title, modifyTitle] = useState('제목');

  return (
    <BrowserRouter>
    <div className="App">
      <div className="header">
        <div style={{fontSize:'20px'}}>FLOG</div> 
        <div className="header-nav">
  
            <Link to="/">HOME</Link>
            <Link to="/login">LOGIN</Link>
          
        </div>       
      </div>
      <div className="content">
        
          <Route path="/" component={ Home } exact />
          <Route  path="/login" component={ Login } exact />
          <Route  path="/signup" component={ Signup } exact />
        
      </div>
    </div>
    </BrowserRouter>
  );
  
}
export default App;
