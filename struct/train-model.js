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

    // Load the collected data to train the model
    brain.loadData('file.json', dataLoaded);
}

function draw() {
    image(video, 0, 0, width, height);

    // Drawing the skeleton if there's a pose

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

function dataLoaded() {
    console.log('Data is loaded!');
    brain.normalizeData();
    brain.train({ epochs: 100 }, finishedTraining);
}

function finishedTraining() {
    console.log('Model is trained!');
    
    // Save the model
    brain.save();
}