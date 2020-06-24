let capture;
let posenet;

let pose;

function setup() {
    createCanvas(640, 480);

    capture = createCapture();
    capture.hide();

    posenet = ml5.poseNet(capture, () => { console.log('Model loaded') });

    posenet.on('pose', poses => { console.log(poses) });
}

function draw() {
    image(capture, 0, 0, width, height);
}