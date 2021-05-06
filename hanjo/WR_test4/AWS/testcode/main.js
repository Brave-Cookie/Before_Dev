'use strict';


const mediaStreamConstraints = {
  video: true,
};

// 스트리밍할 비디오를 받아올 변수
const localVideo = document.querySelector('video');

// Local stream that will be reproduced on the video.
let localStream;

// Handles success by adding the MediaStream to the video element.
function gotLocalMediaStream(mediaStream) {
  localStream = mediaStream;
  localVideo.srcObject = mediaStream;
}

// Handles error by logging a message to the console with the error message.
function handleLocalMediaStreamError(error) {
  console.log('navigator.getUserMedia error: ', error);
}

// navigator: 브라우저 정보를 포함한 객체
// mediaDevices.getUserMedia: 사용자에게 미디어 장치 사용 권한을 요청, 요청 수락시 미디어 트랙을 포함한 MediaStream 을 반환
navigator.mediaDevices.getUserMedia(mediaStreamConstraints)
  .then(gotLocalMediaStream).catch(handleLocalMediaStreamError);
  /*js promise: 자바스크립트 비동기 처리에 사용되는 객체*/
  // A.then(B): A의 실행이 끝나면 B 실행
  // A.catch(B): A가 실패 상태가 되면 B에 저장
