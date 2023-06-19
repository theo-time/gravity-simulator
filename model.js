
class  Blob {
    constructor(position, size, mass, velocity, id) {
        this.id = id;
        this.position = position;
        this.size = size;
        this.velocity = velocity;
        this.mass = mass;
        this.color = color(random(0, 255), random(0, 255), random(0, 255));
        this.fused = false;
        this.forces = [];
        this.collides = false;
    }

    updatePosition = function() {
        // Compute the acceleration
        // for(var j = 0; j < this.forces.length; j++) {
        //     var force = this.forces[j];
        //     var acceleration = force.div(this.mass);
        //     this.velocity.add(acceleration);
        // }
        this.position.add(this.velocity);
        this.forces = [];
    }

}

function drawArrow(base, vec, myColor) {
    push();
        stroke(myColor);
        strokeWeight(3);
        fill(myColor);
        translate(base.x, base.y);
        line(0, 0, vec.x, vec.y);
        rotate(vec.heading());
        var arrowSize = 7;
        translate(vec.mag() - arrowSize, 0);
        triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    pop();
}

function computeBlobsCollisions(Blobs)
{
    for(var i = 0; i < Blobs.length; i++) {
        var blob = Blobs[i];
        for(var j = 0; j < Blobs.length; j++) {
            if(i > j) {
                var otherBlob = Blobs[j];
                if(otherBlob.fused || blob.fused) {
                    continue;
                }
                var distance = blob.position.dist(otherBlob.position);
                if(distance < (blob.size + otherBlob.size) / 2) {
                    // the other blob opposes a force to the current blob
                    // normal of the collision
                    var direction = p5.Vector.sub(blob.position, otherBlob.position);
                    // tangent of the collision
                    var tangentVector = createVector(direction.y, -direction.x);
                    drawArrow(blob.position, tangentVector, 'red');
                    drawArrow(blob.position, blob.velocity, 'yellow');
                    drawArrow(otherBlob.position, otherBlob.velocity, 'yellow');
                    var collisionPoint = p5.Vector.add(blob.position, otherBlob.position).div(2);
                    tangentVector.normalize();
                    // relative velocity
                    var relativeVelocity = p5.Vector.sub(blob.velocity, otherBlob.velocity);
                    console.log("relative velocity");
                    console.log(relativeVelocity);
                    drawArrow(collisionPoint, relativeVelocity, 'green');
                    // impulse magnitude
                    var impulseMagnitude = p5.Vector.dot(tangentVector, relativeVelocity);
                    // impulse
                    var velocityComponentOnTangent = direction.mult(impulseMagnitude);
                    var velocityComponentPerpendicularToTangent = p5.Vector.sub(relativeVelocity, velocityComponentOnTangent);
                    var inversevComponentPerpendicularToTangent = createVector(velocityComponentPerpendicularToTangent.x * -1, velocityComponentPerpendicularToTangent.y * -1);
                    // collision forces
                    otherBlob.velocity =  otherBlob.velocity.add(velocityComponentPerpendicularToTangent);
                    blob.velocity = blob.velocity.add(inversevComponentPerpendicularToTangent);
                    drawArrow(blob.position, blob.velocity, 'blue');
                    drawArrow(otherBlob.position, otherBlob.velocity, 'blue');
                    // otherBlob.forces.push(velocityComponentPerpendicularToTangent * otherBlob.mass);
                    // blob.forces.push(velocityComponentPerpendicularToTangent.mult(-1) * blob.mass);
                    blob.collides = true;
                    otherBlob.collides = true;
                    console.log("collision");
                    console.log(blob.velocity);
                    console.log(otherBlob.velocity);
                    console.log(velocityComponentPerpendicularToTangent)
                    // while(1)
                    // {
                    //     //sleep(1000);
                    //     sleep(1000);
                    // }
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
    }
}



function computeBlobsAccelerations(Blobs)
{
    for(var i = 0; i < Blobs.length; i++) {
        var blob = Blobs[i];
        var gForce = createVector(0, 0);
        for(var j = 0; j < Blobs.length; j++) {
            if(i != j) {
                var otherBlob = Blobs[j];
                var distance = blob.position.dist(otherBlob.position);
                var direction = p5.Vector.sub(otherBlob.position, blob.position);
                direction.normalize();
                var strength = (blob.mass * otherBlob.mass) / (distance * distance);
                direction.mult(strength);
                gForce.add(direction);
            }
        }
        // blob.forces.push(gForce);
        // handle collision 
        if(blob.position.x < 0 || blob.position.x > windowWidth) {
            blob.velocity.x *= -1;
        }
        if(blob.position.y < 0 || blob.position.y > windowHeight) {
            blob.velocity.y *= -1;
        }
        var acceleration = gForce.div(blob.mass);
        blob.velocity.add(acceleration);
    }
}

var Blobs = [];

