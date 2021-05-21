import './App.css';
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './views/Home.js'
import Test1 from './views/Test1.js'
import Test2 from './views/Test2.jsx'
import Test3 from './views/Test3.jsx'




class App extends Component{

  render() {
    return (
      // Vue 의 APP 과 동일한듯.
      <div className="App">
        
        !! 이 곳에 메뉴바 컴포넌트 들어감. !!

        <BrowserRouter>
          <Route path="/" component={Home} exact/>
          <Route path="/Test1" component={Test1} exact/>
          <Route path="/Test2" component={Test2} exact/>
          <Route path="/Test3" component={Test3} exact/>
        </BrowserRouter>

      </div>
    );
  }
}

export default App;
