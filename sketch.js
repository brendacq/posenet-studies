// The first thing to do is gain access to the webcam, so I'll use the createCapture function.
// When you use this function, your browser will ask for permission to connect to the webcam

let video;
let poseNet;

function setup(){
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, () => {
        console.log('model ready')
    });

    poseNet.on('pose', (poses) => {
        console.log(poses);
    });
}


function draw(){
    image(video, 0, 0);
}