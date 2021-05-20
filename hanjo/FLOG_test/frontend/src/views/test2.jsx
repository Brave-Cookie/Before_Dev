import React, { Component } from 'react';
import $ from 'jquery';




/*음성인식 관련 선언부*/
let isRecognizing = false; // 현재 녹음 중인지
let ignoreEndProcess = false;
let finalTranscript = ''; // 누적된 인식 결과

const recognition = new window.webkitSpeechRecognition() // Chrome에서만 동작하는 SpeechRecognition
const language = 'ko-KR';

// 개행 처리 변수
//const two_line = /\n\n/g;
//const one_line = /\n/g;
//const first_char = /\S/;

// $ -> jquery 변수로 선언, jquery 라이브러리의 내장함수 사용
const $btnJoin = $('#btnJoin');
const $btnExit = $('#btnExit');
const $result = $('#result');

const $final_span = $('#final_span');
const $interim_span = $('#interim_span');


recognition.continuous = true; // 음성이 인식될 때마다 결과값 반환
recognition.interimResults = true; // 끝나지 않은 상태의 음성 반환 설정



//--------------------------------------------------------
//-----------------Speech Recognition Code----------------
//--------------------------------------------------------

/* 음성 인식 시작 처리*/
recognition.onstart = function() {
    console.log('onstart', arguments);
    isRecognizing = true;
    $btnJoin.attr('class', 'on');
};


/*음성 인식 종료 처리
    @returns {boolean}*/
recognition.onend = function() {
    console.log('onend', arguments);
    isRecognizing = false;

    // 에러 처리
    if (ignoreEndProcess) {
        return false;
    }

    // DO end process
    $btnJoin.attr('class', 'off');
    if (!finalTranscript) { // 인식된 결과가 없을 경우
        console.log('empty finalTranscript');
        return false;
    }
};


/*음성 인식 결과 처리
    @param event*/
recognition.onresult = function(event) {
    console.log('onresult', event);

    let interimTranscript = '';
    if (typeof(event.results) === 'undefined') { // 에러 처리
        recognition.onend = null;
        recognition.stop();
        return;
    }

    for (let i = event.resultIndex; i < event.results.length; ++i) { // 음성인식 이벤트 결과(string)
        if (event.results[i].isFinal) { // 음성인식 종료된 최종 결과일 경우
            finalTranscript += event.results[i][0].transcript;
        } else { // 중간 결과일 경우
            interimTranscript += event.results[i][0].transcript;
        }
    }

    /*Front 화면에 글자 표시*/
    //finalTranscript = capitalize(finalTranscript); // 최종본 첫 글자 대문자화(EN)
    $final_span.innerHTML = finalTranscript; // 최종본 개행 처리 linebreak(finalTranscript)
    $interim_span.innerHTML = interimTranscript; // 중간값 개행 처리 linebreak(interimTranscript)

    console.log('finalTranscript', finalTranscript);
    console.log('interimTranscript', interimTranscript);
    // fireCommand(interimTranscript); // undefined Funcion
};


/* 음성 인식 에러 처리
    @param event */
recognition.onerror = function(event) {
    console.log('onerror', event);

    if (event.error.match(/no-speech|audio-capture|not-allowed/)) {
        ignoreEndProcess = true; // 에러의 경우 END Process 건너뛰기
    }

    $btnJoin.attr('class', 'off');
};


/*개행 처리
    @param s
    @returns {string}*/
/*
function linebreak(s) {
  return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}
*/


/*첫문자를 대문자로 변환
    @param s
    @returns {string | void | *}*/
/*
function capitalize(s) {
  return s.replace(first_char, function(m) {
    return m.toUpperCase();
  });
}
*/


//--------------------------------------------------------
//-------------------Initializing Code--------------------
//--------------------------------------------------------


/*음성 인식 트리거
    @param event*/
function join(event) {
    if (isRecognizing) {
        alert('이미 참여 중입니다.');
        return;
    }

    recognition.lang = language;
    recognition.start();
    ignoreEndProcess = false;

    finalTranscript = '';
    // final_span.innerHTML = '';
    // interim_span.innerHTML = '';
}

function exit(event) {
    if (isRecognizing) {
        recognition.stop();
        return;
    }
}


/*초기 바인딩*/
function initialize() {
    $btnJoin.click(join());
    $btnExit.click(exit());
}


//initialize();






class test2 extends Component {

  
  render() {

    return (
        <div>
            <p> STT 테스트 </p>


            <button id='btnJoin'>음성인식 시작</button>
            <button id='btnExit'>음성인식 종료</button>

            <div id='result'>
              <span id="final_span"></span>
              <span id="interim_span"></span>
            </div>

        </div>
    );
  }
}

export default test2;