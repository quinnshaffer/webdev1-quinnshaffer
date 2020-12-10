
var mY = 0;
var mX = 0;
var xAc = 0;
var yAc = 0;
var tAc = 0;
var pAc = 1;
var h = 0;
var li = 0;
var isLocked = false;
var hasStarted = false;
var snd = new Audio('sounds/blip.wav');
var frames = 60;
var mouseWeight = 1.5;
var response = 3 * frames;

var touch=true;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

$(document.body).on("touchstart", function (e) {
  touch=true;
});

function setup() {
  let cnv = createCanvas(innerWidth, innerHeight);
  cnv.parent('#sketch');
  strokeWeight(2);
  frameRate(frames);
  colorMode(HSB, 100);
  $('#words').toggle();
}

function draw() {
  if (hasStarted) {
    if (!isLocked) {
      xAc = (abs(mouseX - mX) * mouseWeight + xAc * response) / (response + mouseWeight); //recording acceleration of the mouse
      if (xAc < 1) xAc = 0;
      yAc = (abs(mouseY - mY) * mouseWeight + xAc * response) / (response + mouseWeight);
      if (yAc < 1) yAc = 0;
      tAc = sqrt(xAc * xAc + yAc * yAc);
      mX = mouseX;
      mY = mouseY;
      pAc = tAc;
      if(touch) tAc /= 50;
      else tAc /= 200;
      h = Math.max(0, -1 * tAc + 21.5 * Math.pow(tAc, 2) - 78 * Math.pow(tAc, 3) + 110.5 * Math.pow(tAc, 4) - 51.5 * Math.pow(tAc, 5)) * 100; //defines the curve used to calulate the color
      background(h, 50, 100);
      if (h < 15) {
        setWords('Wiggle!', h * 3.6);
      }
      else {
        li = 72.5 + h * .25;
        w = $('#words').css({ color: "hsl(" + Math.min(h * 3.6, 360) + ",100%," + li + "%)" }); 
      }
      if (h >= 100) {
        isLocked = true;
        snd.play();
        li = 120;
        $('#wordLink').attr("href", "page2");
      }
    }
    else {
      background(h, 50, li);
      li -= 16;
    }
  }
  else {
    background(0, 50, 100);
  }
}

$('#wel').click(function () {
  $('#wel').toggle();
  $('#words').toggle();
  hasStarted = true;
})


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

      //h = Math.max(0, -.1 * tAc + 1.1 * tAc * tAc) * 100;
      //h = Math.max(0, 2.25 * tAc - 9 * Math.pow(tAc,2) + 14*Math.pow(tAc,3)-.8*Math.pow(tAc,4)-5.4*Math.pow(tAc,5)) * 100;