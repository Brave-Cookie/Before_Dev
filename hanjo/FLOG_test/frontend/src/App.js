import './App.css';
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import home from './views/home.js'
import test1 from './views/test1.js'
import test2 from './views/test2.jsx'
import test3 from './views/test3.jsx'




class App extends Component{

  render() {
    return (
      // Vue 의 APP 과 동일한듯.
      <div className="App">
        
        !! 이 곳에 메뉴바 컴포넌트 들어감. !!

        <BrowserRouter>
          <Route path="/" component={home} exact/>
          <Route path="/test1" component={test1} exact/>
          {/*<Route path="/test2" component={test2} exact/>*/}
          <Route path="/test3" component={test3} exact/>
        </BrowserRouter>

      </div>
    );
  }
}

export default App;
