import React, { Component } from 'react';

class home extends Component {
  render() {
    return (
        <div>
            <p> home </p>

            <a href='/Test1'>Test1 : axios 테스트</a>
            <br/>
            <a href='/Test2'>test2 : 소켓 통신 테스트</a>
            <br/>
            <a href='/Test3'>test3 : WR 테스트</a>

        </div>
    );
  }
}

export default home;