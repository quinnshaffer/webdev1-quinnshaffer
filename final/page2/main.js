var scrolled = 0.0;
var width = $(document).width();
var height = $(document).height();
var min = Math.min(width, height);
var scrollableElement = document.body; //document.getElementById('scrollableElement');
var loops = 0;
var flash = 0;
var hide;
var cnv;
var scrollGoal = 0;
var smoothing = 300;
var isComplete = false;
var intensity = 100;
var snd2played = false;
var snd = new Audio('../bloop.wav');
var snd2 = new Audio('../blip.wav');


scrollableElement.addEventListener('wheel', checkScrollDirection);

function checkScrollDirection(event) {
    if (checkScrollDirectionIsUp(event)) {
        scrollGoal--;
    } else {
        scrollGoal++;
    }
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
    colorMode(HSB, 100);
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    background(0);
    strokeWeight(0);
    fill(0, 100, 75);
    if (!isComplete) {
        scrolled = (scrolled + scrollGoal * smoothing) / (smoothing + 1);
        scrollGoal -= .03;
        if (scrollGoal <= -30) scrollGoal = 30;
    }
    else {
        if (intensity > -10) intensity -= .5;
        else {
            $('#next').css({ display: "block" });
            if (!snd2played) {
                snd2.play();
                snd2played = true;
            }
        }
    }
    spiral(width / 30, width, height, 0, 0, (scrolled - height / 30) * 300);
    loops = 0;
    $('#wel').css({ top: "calc(50% + " + scrolled * 20 + "px)" });
    strokeWeight(scrolled);
    flash++;
}

function spiral(s, w, h, x, y, p) {
    fill((loops + flash) % 100, intensity, intensity * .8);
    if (p <= w) rect(x, y, p, s); // top
    else {
        p -= w - s;
        rect(x, y, w, s);
        if (p <= h) rect(w - s + x, s + y, s, p - s); // right
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
                    if (s <= w - s * 2 && s < h - s * 2) {
                        loops++;
                        spiral(s * .95, w - s * 2, h - s * 2, x + s, y + s, p + s); //loop
                    }
                    else if (!isComplete == true) {
                        isComplete = true;
                        snd.play();
                    }
                }
            }
        }
    }
}
