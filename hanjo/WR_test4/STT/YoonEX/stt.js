var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent
//Add grammar
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList

var keywords = ['권소영', '안지후', '조윤영', '한예지'];
var grammar = '#JSGF V1.0; grammar keywords; public <keyword> = ' + keywords.join(' | ') + ' ;'

var recognition = new SpeechRecognition();

//Add grammar
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;

recognition.lang = 'ko-KR';
recognition.interimResults = false;
recognition.maxAlternatives = 1;


var voice = ""

var diagnostic = document.querySelector('.output');

var start = document.getElementById('start');
start.addEventListener('click', onstart);

function onstart() {
  recognition.start();
  console.log('Ready to receive a command.');
}


recognition.onresult = function(event) {

  var last = event.results.length - 1;


  voice = voice + event.results[last][0].transcript;

  diagnostic.textContent = 'Result received: ' + voice + '.';
  console.log('Confidence: ' + event.results[0][0].confidence);

  addElement();


}

function addElement() {

  for (i = 0; i < keywords.length; i++) {
    if (voice.includes(keywords[i])) {

      var keywordList = document.getElementById('keywordList');

      //Create new li element
      var keyword = document.createElement('span');
      //Add class
      keyword.className = 'btn btn-primary';
      //Add text node with input value
      keyword.appendChild(document.createTextNode(keywords[i]));

      //Append li to list
      keywordList.appendChild(keyword);
    }
  }

}

recognition.onspeechend = function() {
  recognition.stop();
}
recognition.onnomatch = event => {
  console.log('no match');
};

recognition.onerror = function(event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}
