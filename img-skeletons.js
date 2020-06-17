let img;
let posenet;

function setup() {
    createCanvas(640, 480);

    img = createImg('image3.jpg', imageReady);
    img.hide();
    //img.size(640, 480);
    
}

function imageReady(){
    posenet = ml5.poseNet(modelReady);

    posenet.on('pose', (poses) => {
      console.log(poses);
    });
}

function modelReady(){
    console.log('model loaded');

    posenet.singlePose(img);
}

function draw() {
    image(img, 0, 0, width, height);  
}