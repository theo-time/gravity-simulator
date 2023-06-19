
class  Blob {
    constructor(position, size, mass, velocity, id) {
        this.id = id;
        this.position = position;
        this.size = size;
        this.velocity = velocity;
        this.mass = mass;
        this.color = color(random(0, 255), random(0, 255), random(0, 255));
        this.fused = false;
    }
}

var Blobs = [];

function setup() {
    // viewport size
    createCanvas(windowWidth,windowHeight);
    // big blob 
    Blobs[0] = new Blob(createVector(windowWidth / 2, windowHeight / 2), 100, 100, createVector(0, 0));
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
    // clear();
    var blobToRemove = [];

    for(var i = 0; i < Blobs.length; i++) {
        var blob = Blobs[i];
        var force = createVector(0, 0);
        for(var j = 0; j < Blobs.length; j++) {
            if(i != j) {
                var otherBlob = Blobs[j];
                var distance = blob.position.dist(otherBlob.position);
                var direction = p5.Vector.sub(otherBlob.position, blob.position);
                direction.normalize();
                var strength = (blob.mass * otherBlob.mass) / (distance * distance);
                direction.mult(strength);
                force.add(direction);
            }
        }
        // handle collision 
        if(blob.position.x < 0 || blob.position.x > windowWidth) {
            blob.velocity.x *= -1;
        }
        if(blob.position.y < 0 || blob.position.y > windowHeight) {
            blob.velocity.y *= -1;
        }

        //collision between blobs leads to exploding in two pieces
        for(var j = 0; j < Blobs.length; j++) {
            if(i != j) {
                var otherBlob = Blobs[j];
                if(otherBlob.fused || blob.fused) {
                    continue;
                }
                var distance = blob.position.dist(otherBlob.position);
                if(distance < (blob.size + otherBlob.size) / 2) {
                    // the other blob opposes a force to the current blob
                    // blob.velocity.mult(-0.01);
                    // otherBlob.velocity.mult(-0.01);

                    // the blobs fuse together
                    // blob.size = blob.size + otherBlob.size;
                    // blob.mass = blob.mass + otherBlob.mass;
                    // otherBlob.fused = true;

                    

                    // Blob explosion
                    // blob.size = blob.size / 2;
                    // otherBlob.size = otherBlob.size / 2;
                    // if(blob.size > 1) {
                    //     var newBlob = new Blob(createVector(blob.position.x, blob.position.y), blob.size, blob.mass, createVector(blob.velocity));
                    //     var newBlob2 = new Blob(createVector(otherBlob.position.x, otherBlob.position.y), otherBlob.size, otherBlob.mass, createVector(otherBlob.velocity));
                    //     Blobs.push(newBlob);
                    //     Blobs.push(newBlob2);
                    // }
                    // Blobs.splice(i, 1);
                }
            }
        }

        // remove the blobs that have been fused
        // for(var j = 0; j < blobToRemove.length; j++) {
        //     for(var k = 0; k < Blobs.length; k++) {
        //         if(Blobs[k].id == blobToRemove[j]) {
        //             Blobs.splice(k, 1);
        //         }
        //     }
        // }
        blobToRemove = [];
        blob.velocity.add(force);
        blob.position.add(blob.velocity);
        fill(blob.color);
        ellipse(Blobs[i].position.x, Blobs[i].position.y, Blobs[i].size, Blobs[i].size);
    }
    Blobs = Blobs.filter(blob => !blob.fused)
}

function mouseClicked() {
    ellipse(mouseX, mouseY, 5, 5);
    console.log(Blobs)
  }