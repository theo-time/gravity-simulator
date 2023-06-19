for(var j = 0; j < Blobs.length; j++) {
    if(i != j) {
        var otherBlob = Blobs[j];
        var distance = blob.position.dist(otherBlob.position);
        if(distance < blob.size + otherBlob.size) {
            var direction = p5.Vector.sub(otherBlob.position, blob.position);
            direction.normalize();
            var strength = (blob.mass * otherBlob.mass) / (distance * distance);
            direction.mult(strength);
            force.add(direction);
            blob.size = blob.size / 2;
            otherBlob.size = otherBlob.size / 2;
            var newBlob = new Blob(createVector(blob.position.x, blob.position.y), blob.size, blob.mass);
            var newBlob2 = new Blob(createVector(otherBlob.position.x, otherBlob.position.y), otherBlob.size, otherBlob.mass);
            Blobs.push(newBlob);
            Blobs.push(newBlob2);
            // Blobs.splice(i, 1);
        }
    }
}