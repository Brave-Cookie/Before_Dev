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
        recognition.continuous = true;          // true 설정 시 계속해서 음성인식
        recognition.interimResults = false;     // true 설정 시 중간결과 반환
        recognition.maxAlternatives = 1;        // 그냥 1로 지정
        recognition.lang = "ko-KR";             // 한국어로 설정


        // STT 시작하면 발동됨
        recognition.onstart = function () {
            alert('STT 시작')
            isRecognizing = true;
        };

        /*
        // audio 감지 시작시 발동
        recognition.onsoundstart = function() {
            console.log('SOUND start')
        }
        recognition.onaudiostart = function() {
            console.log('AUDIO start')
        }
        recognition.onspeechstart = function() {
            console.log('SPEECH start')
        }

        // audio 감지 끝날때 발동
        recognition.onsoundend = function() {
            console.log('SOUND end')
        }
        recognition.onaudioend = function() {
            console.log('AUDIO end')
        }
        recognition.onspeechend = function() {
            console.log('SPEECH end')
        }
        */

        // STT 종료시 발동됨
        recognition.onend = function () {
            alert('STT 종료')

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

            console.log(event)

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                // 인식된 문장이 끝났을 경우에만 동작
                if (event.results[i].isFinal) {
                    // 방금 인식한 단어를 전체 결과에 추가함
                    finalTranscript += event.results[i][0].transcript;

                    // 콘솔로 찍어보기
                    console.log('방금 인식된 문장 : ', event.results[i][0].transcript)
                    console.log('쌓인 문장들 : ', finalTranscript)
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
            recognition.start()
            ignoreEndProcess = false;
            finalTranscript = "";
        }

        // stt 종료 함수
        function end_stt() {
            if (isRecognizing) {
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

        // ------------------------------------------------------ temp ------------------------------------------------------

        document.getElementById('start_stt').onclick = function () {
            start_stt();
        }
        document.getElementById('end_stt').onclick = function () {
            end_stt();
        }

    }



  render() {

    return (
        <div>
            <p> STT 결과를 socket 통신 </p>

            <br/>
            <button id='start_stt'>STT 시작</button>
            <button id='end_stt'>STT 종료</button>


            <br/><br/><br/>
            <button id='connect_socket'>소켓 통신 + STT 시작</button>
        </div>
    );
  }
}

export default Test4;
