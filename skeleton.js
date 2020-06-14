let video;              // for the video capture
let posenet;            // for the posenet model

let pose;               // to identify the keypoints of the body
let skeleton;           // for drawing the line between the points

function setup() {
    createCanvas(640, 480);

    // The video will be captured after the user grants the permission to the webcam.
    // Since the video will be displayed using the image() function and there's a Canvas element, we use the method hide() so
    // the image won't be in duplicity.
    video = createCapture(VIDEO);
    video.hide();

    // Loading the PoseNet model passing the video capture as argument and a callback function to notify when the model finishes loading.
    posenet = ml5.poseNet(video, () => {
        console.log('model loaded');
    });

    // Now we gotta check if there's any pose being perceived by the model using the method on(). 
    // The callback function is used to store the pose attributes, such as position, part of the body, and also the skeleton property
    // from the poses array so that we can draw lines between the keypoints that are connected.
    posenet.on('pose', (poses) => {
        // console.log(poses);
        if (poses.length > 0) {
            pose = poses[0].pose;
            skeleton = poses[0].skeleton;
        }
    });
}

function draw() {
    // To display the video being captured, let's use the image function. The video will start being "drawned" from (0,0) coordinates.
    image(video, 0, 0);

    // If the model detects a pose, it will draw an ellipse on the keypoints. To check for all the keypoints, we'll run the whole
    // keypoints array looking for the x and y properties from the position object.
    if (pose) {
        for (var i = 0; i < pose.keypoints.length; i++) {

            let x = pose.keypoints[i].position.x;
            let y = pose.keypoints[i].position.y;

            fill(140, 30, 200);
            ellipse(x, y, 15);
        }

        // The line is 2 dimensional, so we need to check the coordinates for both dimensions. Then draw a line from the first
        // (x,y) coordinates to the seconds (x, y) coordinates
        for (var i = 0; i < skeleton.length; i++) {
            let a = skeleton[i][0];
            let b = skeleton[i][1];

            strokeWeight(2);
            stroke(255);
            line(a.position.x, a.position.y, b.position.x, b.position.y);
        }
    }
}
