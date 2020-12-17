var rad;
var node1x, node1y, node2x,node2y;
var off1x, off1y, off2x,off2y;

var ant1x, ant1y, antx2,ant2y;

var col1;
var col2;

var over1=false;
var over2=false;
var over3=false;

var click1=false;
var click2=false;

var isPlaying=false;

var gain=0;
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var oscillator = audioCtx.createOscillator();
var gainNode = audioCtx.createGain();
oscillator.type = 'sine';
oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // value in hertz
oscillator.connect(audioCtx.destination);
oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);
gainNode.gain.value=-1;
oscillator.start();


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    ant1x=windowWidth*(1/3)+windowHeight/-6;
    ant1y=windowHeight*(7/8)+windowWidth/-70;
    ant2x= windowWidth*(2/3)+windowWidth/70;
    ant2y=windowHeight*(7/8)+windowHeight/-6;
    rad=Math.min(windowHeight,windowWidth)/12;
}

function mousePressed() {
    if (over1) {
      click1=true;
    } else {
      click1 = false;
    }
    if (over2) {
        click2=true;
      } else {
        click2 = false;
      }
    if(!over3) isPlaying=!isPlaying;

    
    
    isPlaying=!isPlaying;
    off1x=mouseX-node1x;
    off1y=mouseY-node1y;
    off2x=mouseX-node2x;
    off2y=mouseY-node2y;
  }

  function mouseDragged() {
      if(click1){
        node1x = mouseX-off1x;
        node1y = mouseY-off1y;
      }
      if(click2){
        node2x = mouseX-off2x;
        node2y = mouseY-off2y;
      }
    
  }

function setup() {
    let cnv = createCanvas(innerWidth, innerHeight);
    cnv.parent('#sketch');
    colorMode(HSB);
    rad=Math.min(windowHeight,windowWidth)/12;
    node1x=windowWidth*(1/6);
    node1y=windowHeight/3;
    node2x=windowWidth*5/6;
    node2y=windowHeight/3;
    off1x=0;
    off1y=0;
    off2x=0;
    off2y=0;
    ant1x=windowWidth*(1/3)+windowHeight/-6;
    ant1y=windowHeight*(7/8)+windowWidth/-70;
    ant2x= windowWidth*(2/3)+windowWidth/70;
    ant2y=windowHeight*(7/8)+windowHeight/-6;
    oscillator.frequency.setValueAtTime(1000, audioCtx.currentTime);
}
function draw() {
    node1x= constrain(node1x,0+rad/2,windowWidth-rad/2);
    node1y=constrain(node1y,0+rad/2,windowHeight-rad/2);
    node2x=constrain(node2x,0+rad/2,windowWidth-rad/2);
    node2y=constrain(node2y,0+rad/2,windowHeight-rad/2);
    stroke(0,0);
    col1=color(220,90,80);
    col2=color(40,90,80);
    over1=false;
    over2=false;
    over3=false;
    background(0);
    fill(30,75,40);
    rect(windowWidth/3,windowHeight*.8,windowWidth/3,windowHeight/8);
    fill(50);
    rect(windowWidth*(2/3),windowHeight*(7/8),windowWidth/35,windowHeight/-3);
    rect(windowWidth*(1/3),windowHeight*(7/8),windowHeight/-3,windowWidth/-35)
    
    if(!isPlaying) fill(130,100,75)
    else fill(10,100,35)
    ellipse(windowWidth/2,windowHeight*.8+windowHeight/16,windowHeight/12)
    
    if(dist(mouseX, mouseY, node1x,node1y)<rad/2){
        over1=true;
        col1=color(220,70,95);
    }
    else if (dist(mouseX, mouseY, node2x,node2y)<rad/2){
        over2=true;
        col2=color(40,70,95);
    }
    else if(dist(mouseX, mouseY, windowWidth/2,windowHeight*.8+windowHeight/16)<windowHeight/24) over3=true;
    
    if(!isPlaying) gainNode.gain.value=gain;
    else gainNode.gain.value=-1;
    //console.log((1-dist(node1x,node1y,ant1x,ant1y)/Math.pow(Math.pow(windowWidth,2)+Math.pow(windowHeight,2),.5)));
    oscillator.frequency.setValueAtTime((1-dist(node1x,node1y,ant1x,ant1y)/Math.pow(Math.pow(windowWidth,2)+Math.pow(windowHeight,2),.5))*2000-500, audioCtx.currentTime);
    gain=constrain((1-dist(node2x,node2y,ant2x,ant2y)/Math.pow(Math.pow(windowWidth,2)+Math.pow(windowHeight,2),.5))-1.7,-1,1);
    console.log(gain);
    fill(col1);
    ellipse(node1x, node1y,rad);
    fill(col2);
    ellipse( node2x,node2y,rad);
    
    //stroke(100);
    //strokeWeight(10);
    //point(ant1x,ant1y);
    //point(ant2x,ant2y);
    //strokeWeight(Math.min(width,height)/5);
    //stroke(map(mouseX, 0, width, -30, 300),map(mouseY, 0, height, -30, 300),b);
    //point(mouseX,mouseY);

}