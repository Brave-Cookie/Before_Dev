import React, { Component } from 'react';

class home extends Component {
  render() {
    return (
        <div>
            <p> home </p>

            <a href='/test1'>test1 렌더링 : axios 테스트</a>
            <br/>
            <a href='/test2'>test2 렌더링</a>
        </div>
    );
  }
}

export default home;