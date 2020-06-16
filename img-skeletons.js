let img;
let poseNet;

function setup() {
    createCanvas(640, 480);

    img = createImg('img/image3.jpg', 'athlete', '');
    img.hide();
    poseNet = ml5.poseNet(img, () => {
        console.log('model loaded');
    });
}

function draw() {
    image(img, 0, 0);
}