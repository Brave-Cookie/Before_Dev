import React, { Component } from 'react';
import socketio from 'socket.io-client';


class Test4 extends Component {

    componentDidMount() {
        // ------------------------------------------------------ Chrome STT API ------------------------------------------------------

        // 인식 상태를 관리하는 변수들
        var isRecognizing = false;
        var ignoreEndProcess = false;
        var finalTranscript = "";

        // Chrome STT API 선언
        window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
        var recognition = new window.webkitSpeechRecognition();

        // Chrome STT API 기본 설정
        recognition.continuous = true;      // 음성이 인식될 때마다 결과값 반환
        recognition.interimResults = true;  // 끝나지 않은 상태의 음성 반환 설정
        recognition.lang = "ko-KR";         // 한국어로 설정

        // STT 시작하면 발동됨
        recognition.onstart = function () {
            isRecognizing = true;
        };

        // STT 종료시 발동됨
        recognition.onend = function () {
            isRecognizing = false;

            if (ignoreEndProcess) {
                return false;
            }
            if (!finalTranscript) {
                return false;
            }
        };

        // STT 결과 처리하는 부분 
        // 크롬에서 자동으로 음성을 감지하여 끝을 내면 그 때 발동된다.
        recognition.onresult = function (event) {
            let interimTranscript = "";

            // 
            if (typeof event.results === "undefined") {
                recognition.onend = null;
                recognition.stop();
                return;
            }

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                // 인식된 문장이 끝났을 경우
                if (event.results[i].isFinal) {
                    // 방금 인식한 단어를 전체 결과에 추가함
                    finalTranscript += event.results[i][0].transcript;

                    // 콘솔로 찍어보기
                    console.log(event.results[i][0].transcript)
                    console.log(finalTranscript)
                }
                else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }
        };

        // 에러 처리
        recognition.onerror = function (event) {
            console.log("onerror", event);

            if (event.error.match(/no-speech|audio-capture|not-allowed/)) {
                ignoreEndProcess = true;
            }
        };

    
        // stt 시작하는 함수
        function start_stt() {
            alert('stt 시작!!')
            recognition.start()
            ignoreEndProcess = false;
            finalTranscript = "";
        }

        // stt 종료 함수
        function end_stt() {
            if (isRecognizing) {
                alert('stt 종료.')
                recognition.stop();
                return;
            }
        }

        // ------------------------------------------------------ Event------------------------------------------------------

        let socket;
    
        // 시작버튼 click 이벤트
        document.getElementById('connect_socket').onclick = function () {
            if(socket !== undefined){
                alert('이미 연결되었음.')
            }
            
            else{
                // 첫 소켓 연결 + STT 시작
                socket = socketio.connect('http://localhost:5000')
                alert('소켓 연결됨! Flask 콘솔 확인')
                start_stt();

                // 소켓에서 res 리스닝하는 부분 (socket.on)
                socket.on('connect_res',  function(res){
                    console.log(res)
                })
            }
        }






    }



  render() {

    return (
        <div>
            <p> STT 결과를 socket 통신 </p>

            <br/>

            <button id='connect_socket'>소켓 통신 + STT 시작</button>
        </div>
    );
  }
}

export default Test4;