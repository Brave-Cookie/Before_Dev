import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
        <div>
            <p> home </p>

            <a href='/Test1'>Test1 : axios 테스트</a>
            <br/><br/>
            <a href='/Test2'>Test2 : 소켓 통신 테스트</a>
            <br/><br/>
            <a href='/Test3'>Test3 : WR + STT 테스트</a>
            <br/><br/>
            <a href='/Test4'>Test4 : 음성 소켓 통신 테스트</a>
            <br/><br/>
            <a href='/Test5'>Test5 : 녹음 분석 테스트</a>

        </div>
    );
  }
}

export default Home;