import React, { Component } from 'react';

class home extends Component {
  render() {
    return (
        <div>
            <p> home </p>

            <a href='/test1'>test1 : axios 테스트</a>
            <br/>
            <a href='/test2'>test2 : STT 테스트</a>
            <br/>
            <a href='/test3'>test3 : WR 테스트</a>

        </div>
    );
  }
}

export default home;