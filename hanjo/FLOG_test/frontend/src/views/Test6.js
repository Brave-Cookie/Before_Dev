import React, { Component } from 'react';

class Test6 extends Component {

    componentDidMount() {
        let mediaRecorder;
        var mediaConstraints = {
            audio: true
        };
        
        function onMediaSuccess(stream) {

            mediaRecorder = new window.MediaStreamRecorder(stream);
            mediaRecorder.mimeType = 'audio/wav'; // check this line for audio/wav
            mediaRecorder.dontRecordOnSilence = true;

            mediaRecorder.ondataavailable = function (blob) {
                console.log(blob)
            };

            mediaRecorder.start(9999999999);
        }
        
        function onMediaError(e) {
            console.error('media error', e);
        }


        document.getElementById('start_record').onclick = function () {
            navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError);
        }

        document.getElementById('end_record').onclick = function () {
            mediaRecorder.stop();
            mediaRecorder.save();
        }



    }

  render() {
    return (
        <div>

            <p> 묵음제거 녹음 테스트</p>

            <br />

            <button id="start_record">녹음 시작</button>
            <button id="end_record">녹음 종료</button>

        </div>
    );
  }
}

export default Test6;