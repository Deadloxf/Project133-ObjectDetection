Status = "";
car_image = "";
objects = [];

function preload(){
    car_image = loadImage("car.jpg");
}

function setup(){
    canvas = createCanvas(640,400);
    canvas.position(400,300);
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    Status = true;
    object_Detector.detect(car_image,gotResults);
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(car_image,0,0,640,400);
    if(Status!= "") {
        for(i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected";

            fill("red");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x, objects[i].y - 50);
            noFill();
            stroke("red");
            rect(objects[i].x - 20, objects[i].y - 50, objects[i].width - 200, objects[i].height - 70);
        }
    }
}