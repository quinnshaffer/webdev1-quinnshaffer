var b=50;
var scrollableElement = document.body;
scrollableElement.addEventListener('wheel', checkScrollDirection);


function checkScrollDirection(event) {
    if (checkScrollDirectionIsUp(event)) {
        if(b<=95) b+=5;
    } else {
        if(b>=5) b-=5;   
    }
    oscillator.start();
}

// create web audio api context




function checkScrollDirectionIsUp(event) {
    if (event.wheelDelta) {
        return event.wheelDelta > 0;
    }
    return event.deltaY < 0;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function setup() {
    let cnv = createCanvas(innerWidth, innerHeight);
    cnv.parent('#sketch');
    colorMode(HSB);
}
function draw() {
    background(0);
    strokeWeight(Math.min(width,height)/5);
    stroke(map(mouseX, 0, width, -30, 300),map(mouseY, 0, height, -30, 300),b);
    //point(mouseX,mouseY);

}