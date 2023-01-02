Status = "";
guitar_image = "";
objects = [];

function preload(){
    guitar_image = loadImage("guitar.jpg");
}

function setup(){
    canvas = createCanvas(600,400);
    canvas.position(400,300);
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    Status = true;
    object_Detector.detect(guitar_image,gotResults);
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(guitar_image,0,0,600,400);
    if(Status!= "") {
        for(i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected";

            fill("red");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x, objects[i].y - 190);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y - 190, objects[i].width + 250, objects[i].height + 90);
        }
    }
}