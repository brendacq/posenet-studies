# Studies with ML model PoseNet

This repository stores code from my experiences with the Posenet model, which is used to estimate human poses with the browser in real-time. 

 In this repo, you'll find the codes for Pose Estimation and Image Classification. I used P5.js and ML5.js libraries and followed The Coding Train tutorial.
<br>

## What is Posenet and how to use it

There is a set of computer vision technicques that detect human figures in images or videos and estimates where key body joints are; it's called pose estimation. PoseNet is a ml5.js Machine Learning model that is able to estimate real-time human poses directly from the browser using a webcam capture.

You can follow the steps below and try it out on your own computer.

<br>

### 1. Setting up
Just so we don't need to install anything on our computer, let's use cdn links to access p5.js and ml5.js libraries:

``` html
<!DOCTYPE HTML>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PoseNet experiments</title>
    <script src="https://cdn.jsdelivr.net/npm/p5@1.1.9/lib/p5.js"></script>
    <script src="https://unpkg.com/ml5@0.4.3/dist/ml5.min.js"></script>
    <script language="javascript" type="text/javascript" src="YOURSKETCH.js"></script>
  </head>

  <body>

  </body>
</html>
```
<br>

*__Don't forget to change YOURSKETCH.js to the name of your sketch__*

<br>

### 2. Pose Estimation

In this step, we're gonna create a sketch to capture the video from the webcam, load the PoseNet model and use it identify your key body joints and draw lines connecting them - forming a skeleton.

[Here](https://github.com/brendacq/posenet-studies/blob/master/pose-estimation/skeleton.js) you can find the source code for a full body pose estimation.
<br>
*This step refers to single-person pose estimation, that is, when there's only person centered in the input image/video. If there's multiple persons, the multi-pose estimation algorithm should be used.*


<br>

## References:
* [Real-time Human Pose Estimation in the Browser with TensorFlow.js](https://medium.com/tensorflow/real-time-human-pose-estimation-in-the-browser-with-tensorflow-js-7dd0bc881cd5);
* [ml5.js documentation](https://learn.ml5js.org/docs/#/);
* [p5.js documentation](https://p5js.org/get-started/);
* [Pose Estimation with PoseNet tutorial](https://thecodingtrain.com/learning/ml5/7.1-posenet.html) by The Coding Train;
* [TensorFlow guide](https://www.tensorflow.org/lite/models/pose_estimation/overview).