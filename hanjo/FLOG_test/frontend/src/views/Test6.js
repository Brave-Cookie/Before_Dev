import React, { Component } from 'react';

class Test6 extends Component {

    componentDidMount() {
        document.getElementById('btn_open_room').onclick = function () {
            // 참여 해시코드 생성
            // URL 생성
            // 창 이동 후 화상회의 생성
        }

    }

    render() {
      return (
          <div>
            
            <p>최종 테스트</p>

            <br/>
            <hr/>
            <br/>

            <button id='btn_open_room'>방 만들기</button>
            
            <br/>
            <br/>
            <hr/>
            <br/>
    
            <form>
                <input type='text' placeholder='초대코드 입력'/>
                <br/><br/>
                <button type='submit'>방 입장하기</button>
            </form>

            <br/>
            <hr/>
              
        
        
          </div>
      );
    }
}

export default Test6;