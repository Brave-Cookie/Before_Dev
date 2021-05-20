import React, { Component } from 'react';

// 영역 1
// 전역적인 부분.

// 외부 스크립트 참조 후 RTCMultiConnection 인스턴스생성
// + 추가적인 설정

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


export class test3 extends Component {

    // 영역 2
    // 컴포넌트 관련된 부분


    // 페이지가 로드 된 후 실행되는 js (보통 HTML에서 <script>로 사용)
    componentDidMount() {
        var predefinedRoomId = 'YOUR_Name';

        document.getElementById('btn-open-room').onclick = function () {
            this.disabled = true;
            connection.open(predefinedRoomId);
        };

        document.getElementById('btn-join-room').onclick = function () {
            this.disabled = true;
            connection.join(predefinedRoomId);
        };
    }

    render() {

        // 영역 3
        // 렌더링 이후 사용할 함수 선언하는 부분 


        

        // 여기부터 렌더링
        return (
            <div>
                <p> Web RTC 테스트 </p>

                <button id="btn-open-room">Open Room</button>
                <button id="btn-join-room">Join Room</button>
                <hr />
            </div>
        );
    }
}




export default test3;