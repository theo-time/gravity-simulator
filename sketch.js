

function setup() {
    // viewport size
    createCanvas(windowWidth,windowHeight);
    newBlob = new Blob(createVector(windowWidth / 2, windowHeight / 2), 10, 10, createVector(0, 0));
    // big blob 
    Blobs[0] = new Blob(createVector(windowWidth / 2, windowHeight / 2), 100, 10000, createVector(0, 0));
    // Blobs[1] = new Blob(createVector(windowWidth / 2 + 200, windowHeight / 2), 100, 1000, createVector(-5, 5));
    for (var i = 1; i < 10; i++) {
        var randomPosX = random(0, windowWidth);
        var randomPosY = random(0, windowHeight);
        var randomVelocityX = random(-1, 1);
        var randomVelocityY = random(-1, 1);
        Blobs[i] = new Blob(createVector(randomPosX, randomPosY), 10, 10, createVector(randomVelocityX, randomVelocityY), i);
    }
    smooth();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}


function removeBlob(value, index, arr) {
    // If the value at the current array index matches the specified value (2)
    if (value === 2) {
    // Removes the value from the original array
        arr.splice(index, 1);
        return true;
    }
    return false;
}

function draw() {

    clear();
    var blobToRemove = [];
    push();
    translate(width / 2, height / 2);
    scale(zoom);
    translate(-width / 2, -height / 2);
        computeBlobsAccelerations(Blobs);
        computeBlobsCollisions(Blobs)
        for(var i = 0; i < Blobs.length; i++) {
            var blob = Blobs[i];

            // remove the blobs that have been fused
            // for(var j = 0; j < blobToRemove.length; j++) {
            //     for(var k = 0; k < Blobs.length; k++) {
            //         if(Blobs[k].id == blobToRemove[j]) {
            //             Blobs.splice(k, 1);
            //         }
            //     }
            // }
            blobToRemove = [];

            // Compute the acceleration
            blob.updatePosition();
            drawBlob(blob);
            //reinit
            blob.collides = false;
            // handle collision

        }
        drawBlob(newBlob);
        if(mouseIsPressed) {
            var dragVector = createVector(mouseX - newBlob.position.x, mouseY - newBlob.position.y);
            drawArrow(newBlob.position, dragVector, 'red');
        }
    pop();
    Blobs = Blobs.filter(blob => !blob.fused)
}

function mouseMoved() {
   newBlob.position = createVector(mouseX, mouseY);
}

function mouseWheel(event) {
    if(mouseIsPressed) {
        newBlob.size += event.deltaY / 10;
        newBlob.mass += event.deltaY / 10;
    }
    else {
        if(event.deltaY < 0) {
            zoom *= 1.1;
        }
        else {
            zoom *= 0.9;
        }
    }
}

function mousePressed() {
    newBlob.position = createVector(mouseX, mouseY);
}


function  mouseReleased()
{
    newBlob.velocity = createVector(mouseX - newBlob.position.x, mouseY - newBlob.position.y).div(30);
    Blobs.push(newBlob);
    newBlob = new Blob(createVector(mouseX, mouseY), 10, 10, createVector(0, 0));
}
// newBlob.velocity = createVector(mouseX, mouseY);