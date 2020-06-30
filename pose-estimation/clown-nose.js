// The first thing to do is gain access to the webcam, so I'll use the createCapture function.
// When you use this function, your browser will ask for permission to connect to the webcam

let video;
let poseNet;

let noseX = 0;
let noseY = 0;

let leftEyeX = 0;
let leftEyeY = 0;

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
            let newX = poses[0].pose.keypoints[0].position.x;
            let newY = poses[0].pose.keypoints[0].position.y;
            leftEyeX = poses[0].pose.keypoints[1].position.x;
            leftEyeY = poses[0].pose.keypoints[1].position.y;

            noseX = lerp(noseX, newX, 0.7);
            noseY = lerp(noseY, newY, 0.7);
        }
    });
}


function draw() {
    image(video, 0, 0);

    let d = dist(noseX, noseY, leftEyeX, leftEyeY);

    fill(255, 0, 0);
    ellipse(noseX, noseY, d);
}