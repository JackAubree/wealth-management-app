const background = document.getElementById("background");
const bkctx = background.getContext("2d");

const canvas = document.getElementById("baldini");
const ctx = canvas.getContext("2d");

const foam = new Image();
//array of images for foam splashing at base of waterfall
var foamStages = ["foam-1-green.png", "foam-2-green.png", "foam-3-green.png", "foam-4-green.png", "foam-5-green.png"];
var howManyFoams = foamStages.length;
var i = 0;

var start = ctx.timeStamp;

// coordinates of Bezier curve 1 (rightmost waterfall stream)
var w1x1 = 70;
var w1y1 = 20;
var w1x2 = 110;
var w1y2 = 20;
var w1x = 110;
var w1y = 60;

// coordinates of Bezier curve 2 (second stream from right)
var w2x1 = 50;
var w2y1 = 30;
var w2x2 = 90;
var w2y2 = 20;
var w2x = 90;
var w2y = 65;

// coordinates of Bezier curve 3 (third stream from right)
var w3x1 = 45;
var w3y1 = 50;
var w3x2 = 80;
var w3y2 = 40;
var w3x = 75;
var w3y = 70;

// coordinates of Bezier curve 4 (leftmost stream)
var w4x1 = 55;
var w4y1 = 65;
var w4x2 = 60;
var w4y2 = 60;
var w4x = 60;
var w4y = 75;

var counter = 0;

// find the best verison of requestAnimationFrame for whatever browser is being used
window.requestAnimFrame = (function(callback) {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
    window.setTimeout(callback, 3);
  };
}());


function animateFoam() {
  // foam is drawn on baldini canvas which is laid on top of background canvas
  // this is so that we can clear baldini canvas each time we draw a foam image & prevent endless buildup of foam
  // meanwhile waterfall does not disappear because we do not clear background canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if(i > (howManyFoams - 1)){
    i = 0;
}
// cycle thru foam images to create splashing sprite
foam.src = foamStages[i];
ctx.drawImage(foam, 60, 135, 90, 50);
console.log('drawing' + ' ' + foam.src);
i++;
loopTimer = setTimeout(animateFoam,600);
console.log('calling animateFoam')
}


function waterfall(){
    // clear background canvas & set styles
bkctx.clearRect(0, 0, ctx.canvas.width,   bkctx.canvas.height);
bkctx.strokeStyle = "green";
bkctx.fillStyle = "lightgreen";
bkctx.lineWidth = "1";
bkctx.beginPath();
  
    // draw four waterfall streams simultaneously
    bkctx.bezierCurveTo(w1x1, w1y1, w1x2, w1y2, w1x, w1y);
    bkctx.moveTo(60, 30);
    bkctx.bezierCurveTo(w2x1, w2y1, w2x2, w2y2, w2x, w2y);
    bkctx.moveTo(60, 50);
    bkctx.bezierCurveTo(w3x1, w3y1, w3x2, w3y2, w3x, w3y);
    bkctx.moveTo(50,60);
    bkctx.bezierCurveTo(w4x1, w4y1, w4x2, w4y2, w4x, w4y);
    bkctx.fill();
    bkctx.stroke();

    w1x+=.1;
    w1y+=1;
    w1x2+=.2;
    w2x+=.1;
    w2y+=1;
    w2x2+=.2;
    w3x+=.1;
    w3y+=1;
    w3x2+=.2;
    w4x+=.1;
    w4y+=1;
    w4x2+=.2;
    counter++;
    console.log('POSITIVE KIPTIN' + ' ' + counter);
  
  if (counter < 100) {
    window.requestAnimFrame(waterfall)
  };
  
  if (counter >= 100) {
    console.log("EET EES FENEESHED. AND UH, THE BARBERSHOP WITH FACE THE TEMPLE.");
    //animate foam splashes only after waterfall has fallen completely
    animateFoam();
}
}

window.requestAnimFrame(waterfall);
