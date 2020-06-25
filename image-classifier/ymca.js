let capture;
let posenet;

let pose;
let skeleton;

let brain;          // neural network;

let state = 'waiting...';
let targetLabel;

// To give us time to take place before the data start being collected, we use the JS function setTimeout() that will execute a
// function after the time we set - in this case, 1 second. 
function keyPressed() {

    if (key == 's') {
        // To save the data as a json file
        brain.saveData();
    } else {
        targetLabel = key;
        console.log(targetLabel);

        setTimeout(timing, 1000);
    }
}

// Let's set some time to stop the data collecting - 10 seconds after it starts collecting.
function timing() {
    console.log('collecting');
    state = 'collecting';

    setTimeout(() => {
        state = 'waiting...';
        console.log('not collecting');
    }, 10000);
}

function setup() {
    createCanvas(640, 480);

    capture = createCapture(VIDEO);
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

    // Loading the data collected to train the model
    // brain.loadData('data/data.json', dataLoaded);

    //Create an object to store the 3 files from the model
    const modelInfo = {
        model: 'model/model.json',
        metadata: 'model/model_meta.json',
        weights:'model/model.weights.bin'
    }

    // Load the model trained:
    brain.load(modelInfo, modelLoaded);
}

function modelLoaded() {
    console.log('posenet classification loaded');

    classifyPose();
}

// If a pose is detected, we classify it. If not, wait 0.4 seconds and try to execute the function again
function classifyPose() {
    if (pose) {
        let inputs = [];

        for (var i = 0; i < pose.keypoints.length; i++) {
            let x = pose.keypoints[i].x;
            let y = pose.keypoints[i].y;
            inputs.push(x);
            inputs.push(y);
        }

        brain.classify(inputs, gotResults);
    } else {
        setTimeout(classifyPose, 400);
    }
}

function gotResults(error, results) {
    console.log(results);
    console.log(results[0].label);

    classifyPose();
}

// Beforing training the data, we need to format it so it'll fit the range from 0 to 1. The normalizeData() method can be used to facilitate the process.
// After normalizing the data, we can train the model with the train() method.
function dataLoaded() {
    console.log('data loaded');
    brain.normalizeData();
    brain.train({ epochs: 50 }, finishedTraining);
}

function finishedTraining() {
    console.log('model trained');
    // After training the model, saves the files.
    brain.save();
}

function gotPose(poses) {
    // console.log(poses);

    if (poses.length > 0) {
        pose = poses[0].pose;
        skeleton = poses[0].skeleton;

        // The inputs should be collected and fed to the neural net only if a key is pressed. This is how we assure that:
        if (state == "collecting") {
            // To flatten the data, we need to put it on a plain array. Using the push() method, we're gonna save the x and y coordinates
            // to each keypoint in the inputs array, so it'll have 17 positions with 2 informations each: the x and y location.
            let inputs = [];
            let target = [targetLabel];

            for (var i = 0; i < pose.keypoints.length; i++) {
                let x = pose.keypoints[i].position.x;
                let y = pose.keypoints[i].position.y;

                inputs.push(x);
                inputs.push(y);
            }

            // After handling the data, we need to add it to our neural network.
            brain.addData(inputs, target);
        }
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
