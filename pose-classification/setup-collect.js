// Collect data with the ml5.js library.

let video;
let posenet;

let pose;
let skeleton;

let brain; // neural net

let state = "waiting...";
let targetLabel;

function setup() {
  createCanvas(640, 480);

  video = createCapture(VIDEO);
  video.hide();

  posenet = ml5.poseNet(video, () => {
    console.log("PoseNet model loaded!");
  });

  posenet.on("pose", gotPoses);

  // The posenet model will return x and y coordinates of 17 keypoints, that is 34 inputs for the neural network.
  // The outputs will be 4 letters: y, m, c and a.
  // The task is classification: it will take data and classify it as one of the letters, according to the training.
  let options = {
    inputs: 34,
    outputs: 4,
    task: "classification",
    debug: true,
  };

  // Storing the neural net
  brain = ml5.neuralNetwork(options);
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

// To give us time to take place before the data start being collected, we use the JS function setTimeout() that will execute a
// function after the time we set - in this case, 1 second.
function keyPressed() {
  if (key == s) {
    // press s to save the data as a .json file
    brain.saveData();
  } else {
    // A label to "describe" the pose
    targetLabel = key;
    console.log(targetLabel);
    state = "colleting";

    setTimeout(timing, 1000);
  }
}

// Let's set some time to stop the data collecting - 10 seconds after it starts collecting.
function timing() {
  state = "collecting";
  console.log(state);

  setTimeout(() => {
    state = "waiting...";
    console.log(state);
  }, 10000);
}
