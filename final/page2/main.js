var scrolled = 0;
var width = $(document).width();
var height = $(document).height();
var min = Math.min(width, height);
var scrollableElement = document.body; //document.getElementById('scrollableElement');

scrollableElement.addEventListener('wheel', checkScrollDirection);

function checkScrollDirection(event) {
    if (checkScrollDirectionIsUp(event)) {
        scrolled--;
    } else {
        scrolled++;
    }

    console.log(scrolled);
}

function checkScrollDirectionIsUp(event) {
    if (event.wheelDelta) {
        return event.wheelDelta > 0;
    }
    return event.deltaY < 0;
}
function setup() {
    let cnv = createCanvas(innerWidth, innerHeight);
    cnv.parent('#sketch');
    strokeWeight(2);
    frameRate(frames);
    colorMode(HSB, 100);
    //scrolled = 60;
}

function draw() {
    background(255);
    strokeWeight(0);
    fill(0, 100, 75);
    //rect(0,0,scrolled*30,height/10); 
    //console.log(min);

    //spiral(1, width, height, 0, 0, scrolled * 10000);
    strokeWeight(scrolled);
    //point(width/2,height/2);
}
function spiral(s, w, h, x, y, p) {
    var loops=0;
    if (p <= w) rect(x, y, p, s); // top
    else {
        p -= w -s;
        rect(x, y, w, s);
        if (p <= h ) rect(w - s + x, s + y, s, p - s); // right
        else {
            p -= h - s;
            rect(w - s + x, s + y, s, h - s);
            if (p <= w - s) rect(w - s + x, y + h - s, -p, s); //bottom
            else {
                p -= w - s;
                rect(w - s + x, y + h - s, -w + s, s);
                if (p <= h - 2 * s) rect(x, y + h - s, s, -p); // left
                else {
                    p -= h - s;
                    rect(x, y + h - s, s, -h + 2 * s);
                    if(s<=w - s * 2&&s<h - s * 2){
                        loops++;
                        console.log(loops);
                        fill(loops,100,75);
                        spiral(s, w - s * 2, h - s * 2, x + s, y + s, p+s); //loop
                }   }
            }
        }
    }
    console.log(p);
}
