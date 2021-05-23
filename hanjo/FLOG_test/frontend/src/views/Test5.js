import React, { Component } from 'react';

import { MediaRecorder, register } from 'extendable-media-recorder';
import { connect } from 'extendable-media-recorder-wav-encoder';
//import socketio from 'socket.io-client';
import axios from "axios";

class Test5 extends Component {

    
    componentDidMount() {
        async function init(){
            await register(await connect());
        }

        let recorder;

        document.getElementById('start_record').onclick = function () {

            init();

            navigator.mediaDevices.getUserMedia({ audio: true }).then(
                function(stream){
                    alert('소켓 연결 + 녹음 시작')
                    //socket = socketio.connect('http://localhost:5000')

                    recorder = new MediaRecorder(stream, { mimeType: 'audio/wav' });
                    recorder.start();

                    recorder.ondataavailable = function (e) {
                        console.log(e)          // blob event
                        console.log(e.data)     // e.data -> blob 변수. 녹음 결과임

                        // 백엔드로 전송하기 위해 FormData로 생성
                        var fd = new FormData();
                        fd.append("blob", e.data);
                        
                        // 잘 생성됐는지 확인
                        for (let key of fd.keys()) {
                            console.log(key);
                        }
                        for (let value of fd.values()) {
                            console.log(value);
                        }
                        
                        // 파일 전송
                        axios({
                            method: "post",
                            url: 'http://localhost:5000/api/record',
                            data: fd,
                            headers: { "Content-Type": "multipart/form-data" },
                        }).then(
                            (res) => {
                                console.log(res)
                            }
                        )
                        
                        //socket.emit('record', fd);
                    };
                }
            )
        }

        document.getElementById('end_record').onclick = function () {
            if (recorder && recorder.state === "recording"){
                recorder.stop();
                // 녹음된 audio를 flask 소켓 서버로 전송
                //socket.emit('record', myBlob);
            }
        }



        /*
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
                // 녹음 시작
                recorder.start();

                // ondataavailable => 스트림을 data화 시켜 사용하는 메소드
                // 해당 메소드에 결과 데이터를 사용하는 함수를 작성, 매핑 
                recorder.ondataavailable = function (e) {
                    console.log(e)          // blob event
                    console.log(e.data)     // e.data -> blob 변수. 녹음 결과임


                    var fd = new FormData();
                    fd.append("audio_data", e.data);

                    console.log(fd)
                    // 녹음된 audio를 flask 소켓 서버로 전송
                    socket.emit('record', fd);
                };

            });
        }

        

        document.getElementById('end_record').onclick = function () {
            if (recorder && recorder.state === "recording"){
                recorder.stop();


                


                
            }
        }
        */

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