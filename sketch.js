// The first thing to do is gain access to the webcam, so I'll use the createCapture function.
// When you use this function, your browser will ask for permission to connect to the webcam

let video;
let poseNet;

let noseX = 0;
let noseY = 0;

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, () => {
        console.log('model ready')
    });

    poseNet.on('pose', (poses) => {
        // console.log(poses);
        if (poses) {
            noseX = poses[0].pose.keypoints[0].position.x;
            noseY = poses[0].pose.keypoints[0].position.y;
        }
    });
}


function draw() {
    image(video, 0, 0);

    fill(255, 0, 0);
    ellipse(noseX, noseY, 60);
}