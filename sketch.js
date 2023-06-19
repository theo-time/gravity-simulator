

function setup() {
    // viewport size
    createCanvas(windowWidth,windowHeight);
    // big blob 
    Blobs[0] = new Blob(createVector(windowWidth / 2, windowHeight / 2), 100, 1000, createVector(5, 5));
    Blobs[1] = new Blob(createVector(windowWidth / 2 + 200, windowHeight / 2), 100, 1000, createVector(-5, 5));
    // for (var i = 1; i < 10; i++) {
    //     var randomPosX = random(0, windowWidth);
    //     var randomPosY = random(0, windowHeight);
    //     var randomVelocityX = random(-1, 1);
    //     var randomVelocityY = random(-1, 1);
    //     Blobs[i] = new Blob(createVector(randomPosX, randomPosY), 10, 10, createVector(randomVelocityX, randomVelocityY), i);
    // }
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
    // clear();
    var blobToRemove = [];

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
    
    Blobs = Blobs.filter(blob => !blob.fused)
}

function mouseClicked() {
    ellipse(mouseX, mouseY, 5, 5);
    console.log(Blobs)
  }