import React, { Component } from 'react';
import socketio from 'socket.io-client';

class Test5 extends Component {
    componentDidMount() {
        

        let recorder;
        let socket ;

        document.getElementById('start_record').onclick = function () {

            alert('소켓 연결 + 녹음 시작')
            socket = socketio.connect('http://localhost:5000')

            
            // audio media를 가져옴
            navigator.mediaDevices.getUserMedia({
                audio: true
            }).then(function (stream) {
                // audio 스트림을 녹음하는 recorder 객체 생성
                recorder = new MediaRecorder(stream);

                // ondataavailable => 스트림을 data화 시켜 사용하는 메소드
                // 해당 메소드에 결과 데이터를 사용하는 함수를 작성, 매핑 
                recorder.ondataavailable = function (e) {
                    console.log(e)          // blob event
                    console.log(e.data)     // e.data -> blob 변수. 녹음 결과임
                    socket.emit('record', {blob : e.data});
                };

                // 녹음 시작
                recorder.start();
            });


           
        }

        document.getElementById('end_record').onclick = function () {
            if (recorder && recorder.state === "recording"){
                recorder.stop();
            }
        }

    }

    render() {
        return (
            <div>
                <p> 녹음 테스트 </p>
                <br />
                <button id="start_record">녹음 시작</button>
                <button id="end_record">녹음 종료</button>
            </div>
        );
    }
}

export default Test5;