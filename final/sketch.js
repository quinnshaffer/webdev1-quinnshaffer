function setup() {
  let cnv = createCanvas(innerWidth, innerHeight);
  cnv.parent('#sketch');
  strokeWeight(2);
  frameRate(60);
}
var mY = 0;
var mX = 0;
var xAc = 0;
var yAc = 0;
var tAc = 0;
var h = 0;
var li = 0;
var isLocked = false;
var snd = new Audio('blip.wav');
snd.volume(50);

function draw() {
  if (!isLocked) {
    xAc = (abs(mouseX - mX) + xAc * 120) / 121;
    if (xAc < 1) xAc = 0;
    yAc = (abs(mouseY - mY) + xAc * 120) / 121;
    if (yAc < 1) yAc = 0;
    tAc = sqrt(xAc * xAc + yAc * yAc);
    mX = mouseX;
    mY = mouseY;
    colorMode(HSB, 100);
    tAc /= 150;
    h = Math.max(0, -.1 * tAc + 1.1 * tAc * tAc) * 100;
    background(h, 50, 100);
    if (h < 10) {
      setWords('Wiggle!', h * 3.6);

    }
    else {
      li = 75 + h * .25;
      w = $('#words').css({ color: "hsl(" + Math.min(h * 3.6, 360) + ",100%," + li + "%)" });
    }
    if (h >= 100) {
      isLocked = true;
      snd.play();
      li=120;
      $('#wordLink').attr("href","page2");
    }
  }
  else {
    background(h, 50, li);
    li-=16;
  }
}

function setWords(words, col) {
  var w = $('#words');
  w.text(words);
  var l = Math.random() * ($(document).width() - w.width());
  var t = Math.random() * ($(document).height() - w.height());
  w.css({ left: l, top: t, color: "hsl(" + col + ",100%,75%)" });

}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
}