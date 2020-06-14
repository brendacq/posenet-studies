// The first thing to do is gain access to the webcam, so I'll use the createCapture function.
// When you use this function, your browser will ask for permission to connect to the webcam

let video;

function setup(){
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.hide();
}

function draw(){
    background(220);
    image(video, 0, 0);
}