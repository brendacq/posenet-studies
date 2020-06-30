/* 
    Trying to detect the 17 keypoints in a static pic.
    It worked well for image2. 

    Problems:
    - image1: it wasn't able to detect the left wrist and right knee. 
    - image3: probably a problem with the size of the pic, gotta resize it; it detected well the ear, nose, eyes and right shoulder.
              It also detected some keypoints in the blured athletes in the background. Not what I'm looking for.
*/

let img;
let posenet;
let pose;

function setup() {
    createCanvas(640, 480);

    img = createImg('img/image2.jpeg', imageReady);
    img.hide();
    //img.size(width, height);
}

function imageReady() {
    posenet = ml5.poseNet(modelReady);

    posenet.on('pose', (poses) => {
        //console.log(poses);

        if (poses.length > 0) {
            pose = poses[0].pose;
        }
    });
}

function modelReady() {
    console.log('model loaded');

    posenet.singlePose(img);
}

function draw() {
    image(img, 0, 0);

    if (pose) {
        for (let i = 0; i < pose.keypoints.length; i++) {
            let x = pose.keypoints[i].position.x;
            let y = pose.keypoints[i].position.y;

            strokeWeight(2);
            stroke(0);
            fill(50, 230, 80);
            ellipse(x, y, 20);
        }
    }
}