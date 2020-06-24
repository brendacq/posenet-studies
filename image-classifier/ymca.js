let capture;
let posenet;

let pose;
let skeleton;

let brain;          // neural network;

function setup() {
    createCanvas(640, 480);

    capture = createCapture();
    capture.hide();

    posenet = ml5.poseNet(capture, () => { console.log('Model loaded') });
    posenet.on('pose', gotPose);

    // The posenet model will return x and y coordinates of 17 keypoints, that is 34 inputs for the neural network.
    // The outputs will be 4 letters: y, m, c and a.
    // The task is classification: it will take data and classify it as one of the letters according to the training.
    let options = {
        inputs: 34,
        outputs: 4,
        task: 'classification',
        debug: true
    }

    // Storing the neural net
    brain = ml5.neuralNetwork(options);
    
}

function gotPose(poses) {
    // console.log(poses);

    if (poses.length > 0) {
        pose = poses[0].pose;
        skeleton = poses[0].skeleton;
    }
}

function draw() {
    image(capture, 0, 0, width, height);

    if (pose) {
        for (var i = 0; i < pose.keypoints.length; i++) {
            let x = pose.keypoints[i].position.x;
            let y = pose.keypoints[i].position.y;

            fill(200, 130, 175);
            strokeWeight(2);
            stroke(0);
            ellipse(x, y, 20);
        }

        for (var i = 0; i < skeleton.length; i++) {
            let a = skeleton[i][0];
            let b = skeleton[i][1];

            strokeWeight(2);
            stroke(255);
            line(a.position.x, a.position.y, b.position.x, b.position.y);
        }
    }
}
