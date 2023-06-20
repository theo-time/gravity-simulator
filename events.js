function mouseMoved() {
    if(settingsHover) 
        return;
    var distanceToMid = createVector(mouseX - windowWidth / 2, mouseY - windowHeight / 2);
    mousePosScaled = distanceToMid.div(zoom);
    // var distanceToMid = createVector(mouseX - windowWidth / 2, mouseY - windowHeight / 2);
    // mousePosScaled = distanceToMid.div(zoom) + createVector(windowWidth / 2, windowHeight / 2).div(zoom);
    newBlob.position = createVector(mousePosScaled.x, mousePosScaled.y);
}

// function mouseDragged() {
//     var distanceToMid = createVector(mouseX - windowWidth / 2, mouseY - windowHeight / 2);
//     mousePosScaled = distanceToMid.div(zoom);
//     newBlob.velocity = createVector(mousePosScaled.x - newBlob.position.x, mousePosScaled.y - newBlob.position.y).div(30);
//     console.error(newBlob.velocity)
// }

function mouseWheel(event) {
    if(settingsHover) 
        return;
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
    if(settingsHover) 
        return;
    var distanceToMid = createVector(mouseX - windowWidth / 2, mouseY - windowHeight / 2);
    mousePosScaled = distanceToMid.div(zoom);
    newBlob.position = createVector(mousePosScaled.x, mousePosScaled.y);
}


function  mouseReleased()
{
    if(settingsHover) 
        return;
    var distanceToMid = createVector(mouseX - windowWidth / 2, mouseY - windowHeight / 2);
    mousePosScaled = distanceToMid.div(zoom);
    // var distanceToMid = createVector(mouseX - windowWidth / 2, mouseY - windowHeight / 2);
    // mousePosScaled = distanceToMid.div(zoom) + createVector(windowWidth / 2, windowHeight / 2).div(zoom);
    newBlob.velocity = createVector(mousePosScaled.x - newBlob.position.x, mousePosScaled.y - newBlob.position.y).div(30);
    var oldBlob = newBlob;
    Blobs.push(newBlob);
    newBlob = new Blob(createVector(mousePosScaled.x, mousePosScaled.y), oldBlob.size, oldBlob.mass, createVector(0,0), Blobs.length);
}
// newBlob.velocity = createVector(mouseX, mouseY);

// JS EVENTS 

var settingsHover = false;

// var tabs = Document.getElementsByClassName("tab");

var settings = document.getElementById("settings");

settings.addEventListener("mouseenter", function() {
    settingsHover = true;
})

settings.addEventListener("mouseleave", function() {
    settingsHover = false;
})

// MENU TABS HANDLING 

var tab_1 = document.getElementById("tab-1");
var tab_2 = document.getElementById("tab-2");
var tab_3 = document.getElementById("tab-3");

// Make tab 2 and 3 invisible
tab_2.style.display = "none";
tab_3.style.display = "none";


var tab_1_button = document.getElementById("tab-1-button");
var tab_2_button = document.getElementById("tab-2-button");
var tab_3_button = document.getElementById("tab-3-button");

tab_1_button.addEventListener("click", function() {
    tab_1.style.display = "block";
    tab_2.style.display = "none";
    tab_3.style.display = "none";
})

tab_2_button.addEventListener("click", function() {
    tab_1.style.display = "none";
    tab_2.style.display = "block";
    tab_3.style.display = "none";
})

tab_3_button.addEventListener("click", function() {
    tab_1.style.display = "none";
    tab_2.style.display = "none";
    tab_3.style.display = "block";
})

// PLANET CREATION SETTINGS

var massSlider = document.getElementById("massSlider");
var sizeSlider = document.getElementById("sizeSlider");

massSlider.addEventListener("input", function() {
    newBlob.mass = parseInt(massSlider.value);
})

sizeSlider.addEventListener("input", function() {
    newBlob.size = parseInt(sizeSlider.value);
})

// AESTETIC SETTINGS

var showTrails = document.getElementById("showTrails");
var autoClearInput = document.getElementById("autoClear");

showTrails.addEventListener("change", function() {
    drawTrails = showTrails.checked;
})

autoClearInput.addEventListener("change", function() {
    autoClear = autoClearInput.checked;
})

// PARTICLES SETTINGS

var boxLimitInput = document.getElementById("boxLimit");
var numberOfParticlesInput = document.getElementById("numberOfParticles");
var initialSpeedInput = document.getElementById("initialSpeed");
var initialSizeInput = document.getElementById("particleSize");
var initialMassInput = document.getElementById("particleMass");
var launchParticlesButton = document.getElementById("launchButton");

launchParticlesButton.addEventListener("click", function() {
    resetFlag = true;
})

boxLimitInput.addEventListener("change", function() {
    boxLimit = boxLimitInput.checked;
})

numberOfParticlesInput.addEventListener("input", function() {
    particleNumber = parseInt(numberOfParticlesInput.value);
})

initialSpeedInput.addEventListener("input", function() {
    particleInitialSpeed = parseInt(initialSpeedInput.value);
})

initialSizeInput.addEventListener("input", function() {
    particleInitialSize = parseInt(initialSizeInput.value);
})

initialMassInput.addEventListener("input", function() {
    particleInitialMass = parseInt(initialMassInput.value);
})


