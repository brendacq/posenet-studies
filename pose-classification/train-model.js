// After collecting and saving the data, it's time to train the model.

let video;
let posenet;

let pose;
let skeleton;

let brain;  // neural net

function setup() {
    createCanvas(640, 480);

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, () => { console.log('PoseNet model loaded!') });

    posenet.on('pose', gotPoses);

    let options = {
        inputs: 34,
        outputs: 4,
        task: "classification",
        debug: true
    }

    brain = ml5.neuralNetwork(options);

    // Load the .json file which contains the collected data to train the model
    brain.loadData('data.json', dataLoaded);
}

function draw() {
    image(video, 0, 0, width, height);

    if (pose) {
        for (let i = 0; i < pose.keypoints.lenght; i++) {
            let x = pose.keypoints[i].position.x;
            let y = pose.keypoints[i].position.y;

            fill(230, 100, 210);
            strokeWeight(2);
            stroke(0);
            ellipse(x, y, 20);
        }

        for (let i = 0; i < skeleton.length; i++) {
            let a = skeleton[i][0];
            let b = skeleton[i][1];

            strokeWeight(2);
            stroke(255);
            line(a.position.x, a.position.y, b.position.x, b.position.y);
        }
    }
}

function gotPoses(poses) {
    // console.log(poses);

    if (poses.length > 0) {
        pose = poses[0].pose;
        skeleton = poses[0].skeleton;
    }
}

// Beforing training the data, we need to format it so it'll fit the range from 0 to 1. The normalizeData() method can be used to facilitate the process.
// After normalizing the data, we can train the model with the train() method.
function dataLoaded() {
    console.log('Data is loaded!');
    brain.normalizeData();
    brain.train({ epochs: 100 }, finishedTraining);
}

function finishedTraining() {
    console.log('Model is trained!');
    // The training will generate 3 model files:
    // 1. model.json,
    // 2. model_meta.json
    // 3. model.weights.bin.

    // After training the model, save the 3 files.
    brain.save();
}