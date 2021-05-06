// let width = 500,
//     height = 0,
//     streaming = false;

// DOM Elements
var localVideo = document.getElementById('localVideo');
const canvas = document.getElementById('canvas');
const photos = document.getElementById('photos');
const startButton = document.getElementById('startButton');
const endButton = document.getElementById('endButton');
//예지
const transImg  = document.getElementById('img');
var playTran;

// Get media stream
// navigator.mediaDevices.getUserMedia({video: true, audio: true})
//   .then(function(stream) {
//     // Link to the video source
//     localVideo.srcObject = stream;
//     // Play video
//     localVideo.play();
//   })
//   .catch(function(err) {
//     console.log(`Error: ${err}`);
//   });

  // Play when ready
  // localVideo.addEventListener('canplay', function(e) {
  //   if(!streaming) {
  //     // Set video / canvas height
  //     height = localVideo.videoHeight / (localVideo.videoWidth / width);
  //
  //     localVideo.setAttribute('width', width);
  //     localVideo.setAttribute('height', height);
  //     canvas.setAttribute('width', width);
  //     canvas.setAttribute('height', height);
  //
  //     streaming = true;
  //   }
  // }, false);

  // Photo button event
  startButton.addEventListener('click', function(e) {
    takePicture();
    e.preventDefault();
  }, false);

  // Clear event
  endButton.addEventListener('click', function(e) {
    // Clear photos
    photos.innerHTML = '';
    clearInterval(playTran);
  });

  // Take picture from canvas
  function takePicture() {
    capture();
    playTran = setInterval(function() {capture();}, 2000);
  }

  function capture(){
    // Create canvas
    const context = canvas.getContext('2d');
    //if(width && height) {
      // set canvas props
      canvas.width = 320;
      canvas.height = 240;
      // Draw an image of the video on the canvas
      context.drawImage(localVideo, 0, 0, 320, 240);

      // Create image from the canvas
      const imgUrl = canvas.toDataURL('image/png');

      // Create img element
      const img = document.createElement('img');

      // Set img src
      img.setAttribute('src', imgUrl);

      //예지
      transImg.value = imgUrl;
      document.getElementById("form").submit();

      // Add image to photos
      photos.appendChild(img);
    //}
  }
