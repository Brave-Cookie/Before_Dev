import React from 'react';
import {withRouter } from 'react-router-dom';

// api/axios 파일에 등록된 함수를 import
import { axios_test,axios_summarize } from '../api/axios.js'


function test(props) {

    async function btn_test() { 
        console.log('요청테스트')
        var res = await axios_test();
        console.log(res)
    }

    async function btn_summarize() { 
        console.log('서머리 테스트')
        const meeting_id = 3
        console.log('서머리 테스트')
        var res = await axios_summarize(meeting_id);   //미팅아이디 넘겨주기 2
         console.log('서머리 테스트')
        console.log(res)
    }

    return(
        <div className="content">
            <button onClick={btn_test}> 요청 테스트 </button>
            <button onClick={btn_summarize}> 요약문 내놔 </button>
        </div>
    )
}

export default withRouter(test);