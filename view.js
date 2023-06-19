
function drawBlob(blob)
{
    if(blob.collides) 
        fill(255, 0, 0);
    else 
        fill(blob.color);
    ellipse(blob.position.x, blob.position.y, blob.size, blob.size);
}