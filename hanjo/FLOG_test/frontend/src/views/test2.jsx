import React, { Component } from 'react';
// import $ from 'jquery';

import socketio from 'socket.io-client';




class Test2 extends Component {

    componentDidMount() {
        /*
        let socket;
        
        document.getElementById('connect_socket').onclick = function () {
            socket = socketio.connect('http://localhost:5000')
            alert('소켓 연결됨! Flask 콘솔 확인')

            document.getElementById('dummy_socket').onclick = function () {
                socket.emit('dummy', {msg : '더미 보내기'});
            }

            socket.on('dummy',  function(res){
                console.log(res)
            })
        }
        */
    }

    render() {
        // socket 함수
        // emit(이벤트명, 데이터) : 전송
        // on(이벤트명, 수신 데이터 처리함수) : 수신


        // 소켓 인스턴스 생성
        let socket ;

        function connect_socket(){
            // Flask 서버와 소켓 통신 시작
            socket = socketio.connect('http://localhost:5000')
            alert('소켓 연결됨! Flask 콘솔 확인')

            // 소켓에서 res 리스닝하는 부분 (socket.on)
            socket.on('dummy',  function(res){
                console.log(res)
            })
        }
        
        function dummy_socket(){
            if(socket === undefined){
                alert('소켓연결 안됨!')
            }
            else{
                // 소켓 emit
                socket.emit('dummy', {msg : '더미 보내기'});
            }
        }
        
       
        return (
            <div>
                <p> 소켓 통신 테스트 </p>

                <br/><br/>

                <button onClick={connect_socket}>소켓통신 시작</button>
                <button onClick={dummy_socket}>연결 확인 </button>

            </div>
        );
    }
}

export default Test2;