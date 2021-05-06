/*작성자: 권소영(onisley@github.com)*/

/*회의실 생성 변수*/
let onAir = false; // 회의가 진행 중인지
const mediaStreamConstraints = { // 사용할 Media 요소들
    video: true
};
const localVideo = document.querySelector('video');
let localStream;

/*회의실 생성 함수*/
function gotLocalMediaStream(mediaStream) { // 얻어온 Media 요소를 할당하는 함수
    localStream = mediaStream;
    localVideo.srcObject = mediaStream;
}

function handleLocalMediaStreamError(error) { // Media 얻어오기 실패 시 에러 처리
    console.log('navigator.getUserMedia error: ', error);
}

//--------------------------------------------------------
//-----------------버트으으으은코오오오오드-----------------
//--------------------------------------------------------

// Join 버튼을 클릭하면 회의 시작
var btnJoin = document.getElementById('btnJoin');
btnJoin.addEventListener('click', onBtnJoin);

function onBtnJoin() {
    if (onAir) {
        return;
    }

    // 미디어 자원을 얻어온다.
    navigator.mediaDevices.getUserMedia(mediaStreamConstraints).then(gotLocalMediaStream).catch(handleLocalMediaStreamError);

    // 회의 진행 상태로 변경
    onAir = true;

    console.log("onBtnJoin()");
    console.log("onAir: " + onAir);
};

// Exit 버튼을 클릭하면 회의 종료
var btnExit = document.getElementById('btnExit');
btnExit.addEventListener('click', onBtnExit);

function onBtnExit() {
    if (onAir) {

        // 미디어 자원을 해제한다.
        localStream = null;
        localVideo.srcObject = null;

        alert("Done");

        // 회의 종료 상태로 변경
        onAir = false;

        console.log("onBtnExit()");
        console.log("onAir: " + onAir);
    }
};
