

function resett() {
    Blobs = [];
    newBlob = new Blob(createVector(windowWidth / 2, windowHeight / 2), 10, 10, createVector(0, 0));
    for (var i = 0; i < particleNumber; i++) {
        var randomPosX = random(- windowWidth / 2, windowWidth / 2);
        var randomPosY = random(- windowHeight / 2, windowHeight / 2);
        var randomVelocity = createVector(random(-1, 1), random(-1, 1));
        randomVelocity.normalize().mult(particleInitialSpeed);
        Blobs[i] = new Blob(createVector(randomPosX, randomPosY), particleInitialSize, particleInitialMass, randomVelocity, i);
    }
    resetFlag = false;
}

function setup() {
    // viewport size
    createCanvas(windowWidth,windowHeight);
    newBlob = new Blob(createVector(windowWidth / 2, windowHeight / 2), 10, 10, createVector(0, 0));
    // big blob 
    Blobs[0] = new Blob(createVector(0, 0), 100, 10000, createVector(0, 0));
    
    // Small blobs orbiting 
    Blobs[1] = new Blob(createVector(0, -200), 10, 10, createVector(5, 0));
    Blobs[2] = new Blob(createVector(0, 200), 10, 10, createVector(-5, 0));
    Blobs[3] = new Blob(createVector(200, 0), 10, 10, createVector(0, 5));
    Blobs[4] = new Blob(createVector(-200, 0), 10, 10, createVector(0, -5));
    // Blobs[5] = new Blob(createVector(100, 100), 10, 10, createVector(5, 5));


    // Blobs[0] = new Blob(createVector(windowWidth / 2 + 200, windowHeight / 2), 100, 1000, createVector(-5, 5));
    // for (var i = 1; i < 500; i++) {
    //     var randomPosX = random(- windowWidth / 2, windowWidth / 2);
    //     var randomPosY = random(- windowHeight / 2, windowHeight / 2);
    //     var randomVelocityX = random(-1, 1);
    //     var randomVelocityY = random(-1, 1);
    //     Blobs[i] = new Blob(createVector(randomPosX, randomPosY), 5, 10, createVector(randomVelocityX, randomVelocityY), i);
    // }
    setFrameRate(200);
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
    if(autoClear)
        clear();
    var blobToRemove = [];
    push();
        translate(width / 2, height / 2);
        scale(zoom);
        // translate(-width / 2, -height / 2);
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
        if(mouseIsPressed && !settingsHover) {
            var distanceToMid = createVector(mouseX - windowWidth / 2, mouseY - windowHeight / 2);
            mousePosScaled = distanceToMid.div(zoom);
            var draggedVec = createVector(mousePosScaled.x - newBlob.position.x, mousePosScaled.y - newBlob.position.y);
            drawArrow(newBlob.position, draggedVec, 'red');
        }
    pop();
    Blobs = Blobs.filter(blob => !blob.fused)
    if(resetFlag)
        resett();
}

