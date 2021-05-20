import React, { Component } from 'react';

// 영역 1
// 전역적인 부분.


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
recognition.continuous = true;      // 음성이 인식될 때마다 결과값 반환
recognition.interimResults = true;  // 끝나지 않은 상태의 음성 반환 설정
recognition.lang = "ko-KR";         // 한국어로 설정

// STT 시작하면 발동됨
recognition.onstart = function() {
  isRecognizing = true;
};

// STT 종료시 발동됨
recognition.onend = function() {
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
recognition.onresult = function(event) {
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
recognition.onerror = function(event) {
  console.log("onerror", event);

  if (event.error.match(/no-speech|audio-capture|not-allowed/)) {
    ignoreEndProcess = true;
  }
};


// ------------------------------------------------------------------------------------------------------------------------


export class test3 extends Component {

    // 영역 2
    // 컴포넌트 관련된 부분


    // 페이지가 로드 된 후 실행되는 js (보통 HTML에서 <script>로 사용)
    componentDidMount() {
        var predefinedRoomId = 'YOUR_Name';

        // Open 버튼 클릭시
        document.getElementById('btn-open-room').onclick = function () {
            this.disabled = true;
            connection.open(predefinedRoomId);

            // stt 시작
            alert('stt시작!!')
            recognition.start()
            ignoreEndProcess = false;
            finalTranscript = "";
        };

        document.getElementById('btn-join-room').onclick = function () {
            this.disabled = true;
            connection.join(predefinedRoomId);

           
        };

        document.getElementById('stt_end').onclick = function () {
             // stt 종료
             if (isRecognizing) {
                recognition.stop();
                return;
            }
        }
    }


    render() {

        // 영역 3
        // 렌더링 이후 사용할 함수 선언하는 부분 
        // 여기서 선언하는 함수들은 보통 이벤트 리스너 함수


        // 여기부터 렌더링 부분
        return (
            <div>
                <p> Web RTC 테스트 </p>

                <button id="btn-open-room">Open Room</button>
                <button id="btn-join-room">Join Room</button>

                <br/>
                <button id="stt_end">STT 종료</button>
                
                <hr />
            </div>
        );
    }
}




export default test3;