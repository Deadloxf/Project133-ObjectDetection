Status = "";
tv_image = "";
objects = [];

function preload(){
    tv_image = loadImage("tv.jpg");
}

function setup(){
    canvas = createCanvas(640,350);
    canvas.position(400,300);
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    Status = true;
    object_Detector.detect(tv_image,gotResults);
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(tv_image,0,0,640,350);
    if(Status!= "") {
        for(i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected";

            fill("red");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x, objects[i].y);
            noFill();
            stroke("red");
            rect(objects[i].x + 50, objects[i].y, objects[i].width + 30, objects[i].height + 10);
        }
    }
}