let video;              // for the video capture
let posenet;            // for the posenet model

let pose;               // to identify the keypoints of the body
let skeleton;           // for drawing the line between the points

function setup() {
    createCanvas(640, 480);

    // To access the audio or video feed from a webcam, the createCapture() function creates a new HTML5 file <video> element.
    // The capture will be displayed by default and separated from the canvas.
    // The video will be captured after the user grants the permission to the webcam.
    // Since the video will be displayed using the image() function and there's a Canvas element, we use .hide() so
    // the image won't be in duplicity.
    video = createCapture(VIDEO);
    video.hide();

    // Loading the PoseNet model passing the video capture as argument and a callback function to notify when the model finishes loading.
    posenet = ml5.poseNet(video, () => {
        console.log('model loaded');
    });

    // Now we gotta check if there's any pose being perceived by the model using the event .on(). 
    // The callback function is used to store the pose attributes, such as position, part of the body, and also the skeleton property
    // from the poses array so that we can draw lines between the keypoints that are connected.
    posenet.on('pose', (poses) => {
        // console.log(poses);

        /*
            [{ pose{} }, { skeleton[12] }]
            pose: { score, keypoints[{ index: {score, part, position: {x, y} } } ], parts of the body: {x, y, confidence} }
            skeleton[12] = { index[2] = { 0: {score, part, position: {x, y}}, 1: {score, part, position: {x, y}}  }}
        */

        if (poses.length > 0) {
            pose = poses[0].pose;
            skeleton = poses[0].skeleton;
        }
    });
}

function draw() {
    // To display the video that's being captured, let's use the image() function. The video will start being "drawned" from (0,0) coordinates.
    image(video, 0, 0);

    // If the model detects a pose, we'll draw an ellipse on the keypoints. To check all the keypoints, we'll run the whole
    // keypoints array looking for the x and y properties from the position object.
    if (pose) {
        for (var i = 0; i < pose.keypoints.length; i++) {

            let x = pose.keypoints[i].position.x;
            let y = pose.keypoints[i].position.y;

            fill(140, 30, 200);
            ellipse(x, y, 15);
        }

        // In the skeleton array, each element is an array containing 2 objects. These objects have a 'score' and a 'part' property,
        // and a 'position' object with x, y properties. 
        // The model probably uses the coordinates of each keypoint to determine which parts are connected.
        // To draw the line from the two parts that are connected, we need the x and y position of the 2 elements. Also we need to do
        // that for each element of the skeleton array.
        for (var i = 0; i < skeleton.length; i++) {
            let a = skeleton[i][0];
            let b = skeleton[i][1];

            strokeWeight(2);
            stroke(255);
            line(a.position.x, a.position.y, b.position.x, b.position.y);
        }
    }
}
