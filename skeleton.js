let video;              // for the video capture
let posenet;            // for the posenet model

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
    // The callback function is used to send us the data sent by the model.
    posenet.on('pose', (poses) => {
        console.log(poses);
    });
}

function draw() {
    // To display the video being captured, let's use the image function. The video will start being "drawned" from (0,0) coordinates.
    image(video, 0, 0);
}