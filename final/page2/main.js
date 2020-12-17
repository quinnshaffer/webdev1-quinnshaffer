var scrolled = 0.0;
var width = $(document).width();
var height = $(document).height();
var min = Math.min(width, height);
var scrollableElement = document.body; //document.getElementById('scrollableElement');
var loops = 0;
var flash = 0;
var scrollGoal = 0;
var smoothing = 300;
var isComplete = false;
var intensity = 100;
var snd2played = false;
var snd = new Audio('../sounds/bloop.wav');
var snd2 = new Audio('../sounds/blip.wav');

var start;
var end;
var flick = false;
var distance;
var force = 0;
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// create Oscillator node
var oscillator = audioCtx.createOscillator();
var gainNode = audioCtx.createGain();
oscillator.type = 'sine';
oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // value in hertz
oscillator.connect(audioCtx.destination);
oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);
gainNode.gain.value=-.8;
oscillator.start();


scrollableElement.addEventListener('wheel', checkScrollDirection);

$(document.body).on("touchstart", function (e) {
    flick = false;
    var contact = e.originalEvent.touches;
    start = contact[0].pageY;
});
$(document.body).on("touchmove", function (e) {
    var contact = e.originalEvent.touches;
    end = contact[0].pageY;
    distance = end - start;
    scrollGoal += distance / 50;
    start = contact[0].pageY;
});

$(document.body).on("touchend", function (e) {
    flick = true;
    force = distance;
});

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

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function setup() {
    let cnv = createCanvas(innerWidth, innerHeight);
    cnv.parent('#sketch');
    colorMode(HSB, 100);
    stroke(0,0);
    
}


function draw() {
    background(0);
    strokeWeight(0);
    fill(0, 100, 75);
    if (!isComplete) {
        scrolled = (scrolled + scrollGoal * smoothing) / (smoothing + 1); //smooths scrolling
        scrollGoal -= .05;
        if (flick) {
            if(force>10||force<-10)
            scrollGoal+= force/50;
            force*=.87;
        }
        else flick=false;
        if (scrollGoal <= -30) scrollGoal = 30;
    }
    else {
        if (intensity > -10) intensity -= .5; //fade to black
        else {
            $('#next').css({ display: "block" });
            if (!snd2played) {
                snd2.play();
                snd2played = true;
            }
        }
    }
    if (scrollGoal > 30) spiral(width / 30, width, height, 0, 0, (scrolled - height / 30) * 300);
    loops = 0;
    $('#wel').css({ top: "calc(50% + " + scrolled * 20 + "px)" });
    flash++;
    //console.log(Math.min(Math.max(.00003*Math.pow(Math.max(scrolled,0),3.821928),0),20000));
    oscillator.frequency.setValueAtTime(Math.min(Math.max(.00003*Math.pow(Math.max(scrolled,0),3.821928),0),20000), audioCtx.currentTime);
    //$("#wel").css({color:"red"});
    //$("#wel").html(Math.floor(scrolled));
    
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
                        oscillator.stop();
                        snd.play();
                    }
                }
            }
        }
    }
}

