import React, { Component } from 'react';

// axios 파일에서 test 함수 꺼내옴
import {test} from '../api/axios.js'

class test1 extends Component {
  render() {
    // 이곳에 데이터나 여러 추가적인 부분 씀

    // 클릭시 꺼내온 함수 발동
    function clickme(){
      var res = test();
      console.log(res);
    }


    
    

    // html 요소 쓰는부분?
    return (
        <div>
            <p> test1 </p>

            <button onClick={clickme}> POST 요청 </button>
        </div>
    );
  }
}

export default test1;