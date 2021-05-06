// Global Vars
let width = 500,
    height = 0,
    streaming = false;

// DOM Elements
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photos = document.getElementById('photos');
const photoButton = document.getElementById('photo-button');
const clearButton = document.getElementById('clear-button');
//예지
const transImg  = document.getElementById('img');
var playTran;

// Get media stream
navigator.mediaDevices.getUserMedia({video: true, audio: true})
  .then(function(stream) {
    // Link to the video source
    video.srcObject = stream;
    // Play video
    video.play();
  })
  .catch(function(err) {
    console.log(`Error: ${err}`);
  });

  // Play when ready
  video.addEventListener('canplay', function(e) {
    if(!streaming) {
      // Set video / canvas height
      height = video.videoHeight / (video.videoWidth / width);

      video.setAttribute('width', width);
      video.setAttribute('height', height);
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);

      streaming = true;
    }
  }, false);

  // Photo button event
  photoButton.addEventListener('click', function(e) {
    takePicture();

    e.preventDefault();
  }, false);

  // Clear event
  clearButton.addEventListener('click', function(e) {
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
    if(width && height) {
      // set canvas props
      canvas.width = width;
      canvas.height = height;
      // Draw an image of the video on the canvas
      context.drawImage(video, 0, 0, width, height);

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
    }
  }