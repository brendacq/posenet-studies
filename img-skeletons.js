let img;
let poseNet;
let pose;

function setup() {
    createCanvas(640, 480);

    img = createImg('./img/image3.jpg', ' ', '');
    img.size(width, height);
    img.hide();

    poseNet = ml5.poseNet(img, () => {
        console.log('model loaded');
        poseNet.singlePose(img);
    });

    poseNet.on('pose', poses => {
        console.log(poses);
        if(poses.length > 0){
            pose = poses[0].pose;
        }
    });
}

function draw() {
    image(img, 0, 0, width, height);
}