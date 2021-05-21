import React, { Component } from 'react';

// 영역 1
// 전역적인 부분.


// ------------------------------------------------------------------------------------------------------------------------


export class Test3 extends Component {

    // 영역 2
    // 컴포넌트 라이프 사이클을 구분하여 사용하는 곳.


    // 이 영역은 mount가 된 후 실행됨
    // ** 이벤트 감시하는 부분(DOM 사용)은 이 곳에 코딩!
    componentDidMount() {
        // ------------------------------------------------------ Web RTC ------------------------------------------------------

        var connection = new window.RTCMultiConnection();
        connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

        connection.session = {
            audio: true,
            video: true
        };

        connection.sdpConstraints.mandatory = {
            OfferToReceiveAudio: true,
            OfferToReceiveVideo: true
        };

        connection.onstream = function (event) {
            document.body.appendChild(event.mediaElement);
        };


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
            alert('stt 시작!!')
            isRecognizing = true;
        };

        // STT 종료시 발동됨
        recognition.onend = function () {
            alert('STT 종료됨')
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
            /*
            let interimTranscript = "";

            if (typeof event.results === "undefined") {
                recognition.onend = null;
                recognition.stop();
                return;
            }
            */

            console.log('ev!! : ', event)
            console.log('result!! : ', event.results)

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                // 인식된 문장이 끝났을 경우
                if (event.results[i].isFinal) {
                    // 방금 인식한 단어를 전체 결과에 추가함
                    finalTranscript += event.results[i][0].transcript;

                    // 콘솔로 찍어보기
                    console.log(event.results[i][0].transcript)
                    console.log(finalTranscript)
                }

                /*
                else {
                    interimTranscript += event.results[i][0].transcript;
                }
                */
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
                alert('stt 종료.')
                recognition.stop();
                return;
            }
        }

        var predefinedRoomId = 'YOUR_Name';

        // Open 버튼 클릭시
        document.getElementById('btn-open-room').onclick = function () {
            this.disabled = true;
            connection.open(predefinedRoomId);

            start_stt();
        };
        // Join 버튼 클릭시
        document.getElementById('btn-join-room').onclick = function () {
            this.disabled = true;
            connection.join(predefinedRoomId);

            start_stt();
        };

        document.getElementById('btn_stt_end').onclick = function () {
            end_stt();
        }
    }


    render() {

        // 영역 3
        // 렌더링 이후 사용할 함수 선언하는 부분 
        // 여기서 선언하는 함수들은 보통 이벤트 처리 함수


        // 여기부터 렌더링 부분
        return (
            <div>
                <p> Web RTC 테스트 </p>

                <button id="btn-open-room">Open Room</button>
                <button id="btn-join-room">Join Room</button>

                <br />
                <button id="btn_stt_end">STT 종료</button>

                <hr />
            </div>
        );
    }
}

export default Test3;