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
                        snd.play();
                    }
                }
            }
        }
    }
}

$(function () {
    $.fn.swipe = function (callback) {
        var touchDown = false,
            originalPosition = null,
            $el = $(this);

        function swipeInfo(event) {
            var x = event.originalEvent.pageX,
                y = event.originalEvent.pageY,
                dx, dy;

            dx = (x > originalPosition.x) ? "right" : "left";
            dy = (y > originalPosition.y) ? "down" : "up";

            return {
                direction: {
                    x: dx,
                    y: dy
                },
                offset: {
                    x: x - originalPosition.x,
                    y: originalPosition.y - y
                }
            };
        }

        $el.on("touchstart mousedown", function (event) {
            touchDown = true;
            originalPosition = {
                x: event.originalEvent.pageX,
                y: event.originalEvent.pageY
            };
        });

        $el.on("touchend mouseup", function () {
            touchDown = false;
            originalPosition = null;
        });

        $el.on("touchmove mousemove", function (event) {
            if (!touchDown) { return; }
            var info = swipeInfo(event);
            callback(info.direction, info.offset);
        });

        return true;
    };
});