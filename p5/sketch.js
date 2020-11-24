function setup() {
  let cnv=createCanvas(innerWidth, innerHeight);
  cnv.parent('#sketch');
  strokeWeight(2);
  frameRate(60);
}
var mY=0;
var mX=0;
var xAc=0;
var yAc=0;
var tAc=0;

function draw() {
  xAc=(abs(mouseX-mX)+xAc*30)/31;
  if (xAc<1) xAc=0;
  yAc=(abs(mouseY-mY)+xAc*30)/31;
  if (yAc<1) yAc=0;
  tAc=sqrt(xAc*xAc+yAc*yAc);
  mX=mouseX;
  mY=mouseY;
  colorMode(HSB, 120);
  background(tAc,50,100);
}

function windowResized(){
  resizeCanvas(innerWidth,innerHeight);
}