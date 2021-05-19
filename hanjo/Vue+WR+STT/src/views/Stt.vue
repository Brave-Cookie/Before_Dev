<template>
<div>
  <div id ="test"> sk </div>
  <button onclick='this.a()'> 시작 </button>
</div>

<!-- 
  <div class="voice">
    <button @click="startSpeechToTxt">시작</button>
    <button @click="endSpeechToTxt">끝</button>
    <p>{{transcription_}}</p>

    <br>
    <button id = 'btn'> 눌러 </button>
  </div>
  -->
</template>

<script>
function a(){
  document.getElementById('test').style.display = none
}

</script>




<!-- 
 <script>

  // 하나의 클래스임
  export default {
    name: 'STT test',

    data() {
      return {
        runtimeTranscription_: "",
        transcription_: [],
        lang_: "ko-KR",
        recogniton : '',
      };
    },

    mounted(){
      window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

      this.recognition = new window.SpeechRecognition();
      this.recognition.continuous = true; // 음성이 인식될 때마다 결과값 반환
      this.recognition.interimResults = true; // 끝나지 않은 상태의 음성 반환 설정
      this.recognition.lang = this.lang_;
    },

    methods: {

      startSpeechToTxt() {

        // initialisation of voicereco
        recognition = this.recognition
        
  
        // event current voice reco word
        recognition.addEventListener("result", event => {      
          var text = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join("");
          this.runtimeTranscription_ = text;
        });
        
        // end of transcription
        recognition.addEventListener("end", () => {
          this.transcription_.push(this.runtimeTranscription_);
          this.runtimeTranscription_ = "";
          recognition.stop();
        });
         recognition.start();
      }
    },

  }

  </script>

  -->