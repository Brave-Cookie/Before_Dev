import './App.css';
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import test1 from './views/test1.js'
import test2 from './views/test2.js'


class App extends Component{

  render() {
    return (
      // Vue 의 APP 과 동일한듯.
      <div className="App">
        
        !! 이 곳에 메뉴바 컴포넌트 들어감. !!


        <br/><br/><br/>
        <a href='/test1'>test1 렌더링 : axios 테스트</a>
        <br/>
        <a href='/test2'>test2 렌더링</a>


        <BrowserRouter>
          <Route path="/test1" component={test1} exact/>
          <Route path="/test2" component={test2} exact/>
        </BrowserRouter>

      </div>
    );
  }
}

export default App;
