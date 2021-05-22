import './App.css';
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './views/Home.js'
import Test1 from './views/Test1.js'
import Test2 from './views/Test2.js'
import Test3 from './views/Test3.js'
import Test4 from './views/Test4.js'
import Test5 from './views/Test5.js'


// 크롬인지 확인
var userAgent = window.navigator.userAgent.toLowerCase();
var isChrome = userAgent.indexOf('chrome');
if (isChrome < -1) {
    alert("브라우저가 크롬이 아님")
}


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
          <Route path="/Test4" component={Test4} exact/>
          <Route path="/Test5" component={Test5} exact/>
        </BrowserRouter>

      </div>
    );
  }
}

export default App;
