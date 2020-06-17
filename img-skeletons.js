let img;
let posenet;

function setup() {
    createCanvas(640, 480);

    img = createImg('img/image3.jpg');
    img.hide();
    //img.size(640, 480);
}

function draw() {
    image(img, 0, 0, width, height);
}