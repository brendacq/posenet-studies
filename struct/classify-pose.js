// Classifying the pose using the collected data.

// ATENTION TO THE FILES NAMES

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

    const modelInfo = {
        model: 'model/model-file.json',
        metadata: 'model/model-metadata.json',
        weights: 'model/model.weights.bin'
    }

    brain.load(modelInfo, modelLoaded);
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

function modelLoaded(){
    console.log('Classifier model is loaded!');

    classifyPose();
}

function classifyPose(){
    if(pose){
        let inputs = [];

        for (let i=0; i<pose.keypoints.length; i++){
            let x = pose.keypoints[i].position.x;
            let y = pose.keypoints[i].position.y;

            inputs.push(x);
            inputs.push(y);
        }

        brain.classify(inputs, gotResults);
    } else {
        setTimeout(classifyPose, 400);
    }
}

function gotResults(){
    console.log(results);
    console.log(results[0].label);

    classifyPose();
}