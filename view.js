
function drawBlob(blob)
{
    drawTrail(blob);
    if(blob.collides) 
        fill(255, 0, 0);
    else 
        fill(blob.color);
    ellipse(blob.position.x, blob.position.y, blob.size, blob.size);
}

function drawTrail(blob)
{
    push();
        noFill();
        beginShape();
        stroke(blob.color);
        for(var i = 0; i < blob.history.length; i++) {
            var pos = blob.history[i];
            vertex(pos.x, pos.y);
        }
        endShape();
    pop();
}
