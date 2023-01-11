//FPS
"use strict";
function showFPS(){
  ctx.fillStyle = "White";
  ctx.font = "normal 16pt Arial";
  fps = Math.round(fps);
  ctx.fillText(fps + " fps", 10, 26);
}

/*
//3d

function main() {
  const canvas = document.querySelector('#myCanvas');
  const renderer = new THREE.WebGLRenderer({ canvas });

  const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 50);
  camera.position.z = 2;



  const scene = new THREE.Scene();

  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }

  let mymesh;
  {
    const loader = new THREE.FontLoader();
    // promisify font loading
    function loadFont(url) {
      return new Promise((resolve, reject) => {
        loader.load(url, resolve, undefined, reject);
      });
    }

    async function doit() {
      const font = await loadFont('./helvetiker_regular.typeface.json');
      const geometry = new THREE.TextBufferGeometry('LoyldsTSB', {
        font: font,
        size: .25,
        height: .01,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: .005,
        bevelSegments: 5,
      });
      const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });  // greenish blue
      mymesh = new THREE.Mesh(geometry, material);
      // move pivot point
      geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(-0.75, -0.15, 0));
      scene.add(mymesh);
    }
    doit();
  }
  function render(time) {
    time *= 0.001;  // convert time to seconds

    if (mymesh != null) { // make sure font has been loaded
      mymesh.rotation.z = time;
      mymesh.rotation.y = time;
    }
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

}

*/

//Background Class

class backgroundSprite
{
  constructor(name,pos,width,height){
    this.image = document.createElement("img");
    this.image.src = name ;
    this.pos=new Vector(pos[0],pos[1]);
    this.width=width;
    this.height=height;
  }
  
  draw() {
    ctx.drawImage(this.image,this.pos.x,this.pos.y,width,height);    
  }

  scrollBackground(dir,back2,speed){
    if (dir==0){ 
    }
    else if (dir==1){
      speed=-speed;
      ctx.drawImage(this.image,this.pos.x,this.pos.y,this.width,this.height);
      ctx.drawImage(back2.image,
        0,0, Math.abs(this.pos.x),this.height,
        this.width+this.pos.x,0, Math.abs(this.pos.x),this.height) ;   
      this.pos.x+=speed;back2.pos.x+=speed;
      if (this.pos.x<=-this.width){
        this.pos.x=0; 
        back2.pos.x=this.width;
      }
    }
  }   
}

//Spritesheet

function initCharacter(){ //Horse

  horse=new Sprite("./Images/Sprites/horse.png",15);
  horse.spriteW=256
  horse.spriteH=188
  horse.sheetCols=4
  horse.sheetRows=4
  horse.animDelay=8
  horse.pos.x=150;
  horse.pos.y=418;
  
}

function initStaticCharacter(){ //Fly Horse

  horsestatic=new Sprite("./Images/Sprites/horsestatic.png",1);
  horsestatic.spriteW=256
  horsestatic.spriteH=188
  horsestatic.sheetCols=4
  horsestatic.sheetRows=4
  horsestatic.animDelay=8
  horsestatic.pos.x=150;
  horsestatic.pos.y=418;
  
}

function initStar(){ //Star
  star=new Sprite("./Images/Sprites/star.png",1);
  star.spriteW=256
  star.spriteH=188
  star.sheetCols=1
  star.sheetRows=1
  star.animDelay=8
  star.pos.x=150;
  star.pos.y=418;
}

function initLloyds(){ //Logo
  lloydstatic=new Sprite("./Images/Sprites/lloyds-bank.png",1);
  lloydstatic.spriteW=256
  lloydstatic.spriteH=188
  lloydstatic.sheetCols=1
  lloydstatic.sheetRows=1
  lloydstatic.animDelay=8
  lloydstatic.pos.x=150;
  lloydstatic.pos.y=418;
}

//Sprite Class & Functions

class Sprite {
  constructor(name, frames, spriteWidth, spriteHeight) {
    this.image = document.createElement("img");
    this.image.src = name;
    this.frames = frames;
    this.pos = new Vector(0, 0);
    this.spriteW = spriteWidth;
    this.spriteH = spriteHeight;
    this.scale = 1;
    this.flipY=false;
    this.rotate = 0;
    this.transparency = 1;
    this.index = 1;
    this.sheetRows = 1;
    this.sheetCols = 1;
    this.col = 0;
    this.row = 0;
    this.animDelay = 0;
    this.count = 0;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.transparency;
    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate(this.rotate);
    if(this.flipY){ctx.scale(-this.scale, this.scale);}
    else{ctx.scale(this.scale, this.scale);}
    ctx.translate(-this.spriteW / 2, -this.spriteH / 2);
    ctx.drawImage(this.image, 0, 0, this.spriteW, this.spriteH);
    ctx.restore();

  }

  drawAnimAll() { //Horse in blue forest
    ctx.save()
    ctx.translate(this.pos.x, this.pos.y);
    ctx.translate(-this.spriteW / 2, -this.spriteH / 2);

    this.col = this.index % this.sheetCols;
    this.row = Math.trunc(this.index / this.sheetCols);
    ctx.drawImage(this.image, this.col * this.spriteW, this.row * this.spriteH, this.spriteW, this.spriteH, 0, 0, this.spriteW, this.spriteH);
    ctx.restore()
    this.count += 1;
    if (this.count % this.animDelay == 0) {
      this.count = 0;
      this.index += 1;
      this.index = this.index % this.frames;
    }
  }

  drawAnimAllMove() { //Horse in blue forest
    ctx.save()
    ctx.setTransform(1,0,0,1,horseptx,0)
    horseptx+=0.3;

    this.col = this.index % this.sheetCols;
    this.row = Math.trunc(this.index / this.sheetCols);
    ctx.drawImage(this.image, this.col * this.spriteW, this.row * this.spriteH, this.spriteW, this.spriteH, 0, 318, this.spriteW, this.spriteH);
    ctx.restore()
    this.count += 0.5;
    if (this.count % this.animDelay == 0) {
      this.count = 0;
      this.index += 1;
      this.index = this.index % this.frames;
    }
  }

  wrapScreen(){
    if (this.pos.x<0)this.pos.x=width;
    if (this.pos.x>width)this.pos.x=0;
    if (this.pos.y<0)
    this.pos.y=height;
    if (this.pos.y>height)this.pos.y=0;
  } 
}

//Rain Class'

class Water {
  constructor() {
    this.pos = new Vector(0,0);
    this.velocity = new Vector(0, 0);
    this.startPos = new Vector(0, 0);
    this.startPos.x = this.pos.x = Math.random() * ctx.canvas.width;
    this.startPos.y = this.pos.y = (Math.random() * ctx.canvas.height) - ctx.canvas.height;
    this.length = (Math.random() * 7) + 3;
    let t = (Math.random() * 10) + 10;
    this.velocity = new Vector(0, t);
  }
  drawRain() {
    ctx.save();
    ctx.translate(this.pos.x, this.pos.y);
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, this.length);
    ctx.stroke()
    ctx.restore();
  }
  refreshRain() {
    this.pos.add(this.velocity);
    if (this.pos.y > ctx.canvas.height) {
      this.pos.y = this.startPos.y;
    }
  }
}

class Rain {
  constructor(size) {
    this.size = size;
    this.array = [];
  }
  init() {
    for (let i = 0; i < this.size; i++) {
      this.array.push(new Water())
    }
  }
  refreshRain() {
    for (let i = 0; i < this.size; i++) {
      this.array[i].refreshRain();
    }
  }
  drawRain() {
    for (let i = 0; i < this.size; i++) {
      this.array[i].drawRain();
    }
  }
}

function refreshrain() {
  rain.refreshRain();

}

function finalrain() {
  //ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.strokeStyle='#90dfe5';
  rain.drawRain()
}


//Moon Translation Functions

function moon() {

  ctx.beginPath();
  ctx.arc(850, 40, 25, 0, 2 * Math.PI);
  ctx.fillStyle = '#d1d1b8';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(850, 40, 23, 0, 2 * Math.PI);
  ctx.fillStyle = '#e8e8c3';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(870, 40, 10, 0, 2 * Math.PI);
  ctx.fillStyle = '#d1d1b8';
  ctx.fill();

}

function drawmoon(){

  ctx.save()
  ctx.setTransform(1,0,0,1,moonptx,0)
  moon()
  ctx.restore()
  moonptx-=0.15; //+ makes it go forward - makes it go backwards

}

//Hills Translation Functions

function hills1(){

  ctx.beginPath();
  ctx.arc(850, 500, 80, 0, 2 * Math.PI);
  ctx.fillStyle = '#3e1e44';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(800, 500, 80, 0, 2 * Math.PI);
  ctx.fillStyle = '#0a2238';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(1800, 500, 80, 0, 2 * Math.PI);
  ctx.fillStyle = '#3e1e44';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(2500, 500, 90, 0, 2 * Math.PI);
  ctx.fillStyle = '#3e1e44';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(2600, 500, 80, 0, 2 * Math.PI);
  ctx.fillStyle = '#0a2238';
  ctx.fill();

  
  ctx.beginPath();
  ctx.arc(3200, 500, 110, 0, 2 * Math.PI);
  ctx.fillStyle = '#0a2238';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(4850, 500, 80, 0, 2 * Math.PI);
  ctx.fillStyle = '#3e1e44';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(4800, 500, 80, 0, 2 * Math.PI);
  ctx.fillStyle = '#0a2238';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(5800, 500, 80, 0, 2 * Math.PI);
  ctx.fillStyle = '#3e1e44';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(7000, 500, 80, 0, 2 * Math.PI);
  ctx.fillStyle = '#0a2238';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(8500, 500, 90, 0, 2 * Math.PI);
  ctx.fillStyle = '#3e1e44';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(8600, 500, 80, 0, 2 * Math.PI);
  ctx.fillStyle = '#0a2238';
  ctx.fill();


}

function drawhills1(){
  ctx.save()
  ctx.setTransform(1,0,0,1,hillptx,0)
  hills1()
  ctx.restore()
  hillptx-=0.7;
}

function hills2(){

  ctx.beginPath();
  ctx.arc(1000, 500, 100, 0, 2 * Math.PI);
  ctx.fillStyle = '#006ea9';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(700, 500, 100, 0, 2 * Math.PI);
  ctx.fillStyle = '#006ea9';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(1700, 500, 100, 0, 2 * Math.PI);
  ctx.fillStyle = '#006ea9';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(2600, 500, 100, 0, 2 * Math.PI);
  ctx.fillStyle = '#006ea9';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(3000, 500, 100, 0, 2 * Math.PI);
  ctx.fillStyle = '#006ea9';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(5000, 500, 100, 0, 2 * Math.PI);
  ctx.fillStyle = '#006ea9';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(4700, 500, 100, 0, 2 * Math.PI);
  ctx.fillStyle = '#006ea9';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(6000, 500, 100, 0, 2 * Math.PI);
  ctx.fillStyle = '#006ea9';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(6700, 500, 100, 0, 2 * Math.PI);
  ctx.fillStyle = '#006ea9';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(8000, 500, 100, 0, 2 * Math.PI);
  ctx.fillStyle = '#006ea9';
  ctx.fill();

}


function drawhills2(){

  ctx.save()
  ctx.setTransform(1,0,0,1,hillptx,0)
  hills2()
  ctx.restore()
  hillptx-=0.7; //+ makes it go forward - makes it go backwards

}

//Transition

function transition(){

  ctx.beginPath();
  ctx.rect(0, 0, 800, 800);
  ctx.fillStyle = '#000000';
  ctx.fill();
  ctx.stroke();

}

function wipe(){

  ctx.save()
  transition()
  ctx.restore()

}

//Stars Rotation Functions

function stars(){
  ctx.fillStyle = "yellow";
  ctx.beginPath();
  ctx.moveTo(27, 0.0);
  ctx.lineTo(35.25, 17.5);
  ctx.lineTo(54.5, 19.575);
  ctx.lineTo(40.5, 32.75);
  ctx.lineTo(43.75, 51.25);
  ctx.lineTo(27, 42.5);
  ctx.lineTo(10.3, 51.25);
  ctx.lineTo(13.75, 32.75);
  ctx.lineTo(0.125, 19.5);
  ctx.lineTo(18.75, 17);
  ctx.lineTo(27, 0);
  ctx.closePath();
  ctx.fill();
}

function drawstar(){

  ctx.save()
  ctx.translate(35,20)
  ctx.rotate(starprz)
  ctx.translate(-20,-35)
  stars()
  ctx.restore()  
  
  starprz+=2*toRadians;
}


function updatestar() {
  // star rotation
  if (count < 1000000 * sceneLength) {
    star.rotate += 1 * toRadians;
  }
  else if (count == 4 * sceneLength) {
    star.rotate = 4;
    if (star.flipY) star.flipY = false;
    else star.flipY = true;

  }
}

function updatestar2() {
  // star rotation
  if (count < 1000000 * sceneLength) {
    star2.rotate += 1 * toRadians;
  }
  else if (count == 4 * sceneLength) {
    star2.rotate = 4;
    if (star2.flipY) star2.flipY = false;
    else star2.flipY = true;

  }
}

function updatestar3() {
  // star rotation
  if (count < 1000000 * sceneLength) {
    star3.rotate += 1 * toRadians;
  }
  else if (count == 4 * sceneLength) {
    star3.rotate = 4;
    if (star3.flipY) star3.flipY = false;
    else star3.flipY = true;

  }
}

function updatestar4() {
  // star rotation
  if (count < 1000000 * sceneLength) {
    star4.rotate += 1 * toRadians;
  }
  else if (count == 4 * sceneLength) {
    star4.rotate = 4;
    if (star4.flipY) star4.flipY = false;
    else star4.flipY = true;

  }
}

function updatestar5() {
  // star rotation
  if (count < 1000000 * sceneLength) {
    star5.rotate += 1 * toRadians;
  }
  else if (count == 4 * sceneLength) {
    star5.rotate = 4;
    if (star5.flipY) star5.flipY = false;
    else star5.flipY = true;

  }
}

// Horse Scaling Function

function updateflyinghorse() {

  if (count < 5 * sceneLength) {
    horsestatic.scale += -.001;
    horsestatic.pos.x += 1;

  }

  else if (count == 5 * sceneLength) {
    horsestatic.scale = 1;
  }

}

//Animation - Loops and Timing

function wipeloop() { //Cut to black
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
  wipe()

  showFPS()

  window.requestAnimationFrame(wipeloop)
}

function loop(timestamp) { //Horse in blue forest
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
  background1.scrollBackground(1,background2,0.8)
  drawhills1()
  horse.drawAnimAll()
  drawmoon()
  drawhills2()

 
  let delta = (timestamp - lastRender);
  fps = 1000 / delta;
  showFPS()
  lastRender = timestamp;
  window.requestAnimationFrame(loop)
}

function loop2(timestamp) { //Horse runs

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
  background1.scrollBackground(1,background2,0.4)
  drawmoon()
  drawhills1()
  horse.drawAnimAllMove()
  drawhills2()
  

  showFPS()

  lastRender = timestamp;
  window.requestAnimationFrame(loop2)
}


function loop3(timestamp) { //Horse in dark forest
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
  background3.scrollBackground(1,background4,0.8)
  horse.drawAnimAll()
  
  drawstar()

  star.draw()
  updatestar()
  star.pos.x = 700; star.pos.y = 100;

  star2.draw()
  updatestar2()
  star2.pos.x = 550; star2.pos.y = 150;
  
  star3.draw()
  updatestar3()
  star3.pos.x = 400; star3.pos.y = 100;

  star4.draw()
  updatestar4()
  star4.pos.x = 250; star4.pos.y = 150;

  star5.draw()
  updatestar5()
  star5.pos.x = 100; star5.pos.y = 100;


  showFPS()

  lastRender = timestamp;
  window.requestAnimationFrame(loop3)
}

function loop4(timestamp) { //Horse flys lake

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
  background5.scrollBackground(1,background6,0.8)

  updateflyinghorse()
  horsestatic.draw()



  refreshrain()
  finalrain()


  count++;
  showFPS()

  lastRender = timestamp;
  window.requestAnimationFrame(loop4)
}

function loop5(timestamp) { //Horse logo

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
  background5.scrollBackground(1,background6,0.4)

  lloydstatic.draw()

  refreshrain()
  finalrain()

  showFPS()

  lastRender = timestamp;
  window.requestAnimationFrame(loop5)
}

setTimeout(loop, 0); //Horse in blue forest
setTimeout(loop2, 9000); //Horse Runs
setTimeout(wipeloop, 27000);
setTimeout(loop3, 28000); //Horse in dark forest
setTimeout(wipeloop, 46000);
setTimeout(loop4, 47000);// Horse In lake 
setTimeout(loop5, 52000); //Logo
setTimeout(wipeloop, 60000);

//Music

let music = new Audio('./Music/song.wav'); 
music.play();

//lets and Calls

/*import * as THREE from './three.module.js';*/

let ctx = document.querySelector("canvas").getContext("2d")

let horsestatic = new Sprite("./Images/Sprites/horsestatic.png", 1, 256, 188);
horsestatic.pos.x = 250; horsestatic.pos.y = 100;

let lloydstatic = new Sprite("./Images/Sprites/lloyds-bank.png", 1, 724, 432);
lloydstatic.pos.x = 400; lloydstatic.pos.y = 250;

let star = new Sprite("./Images/Sprites/star.png", 1, 100, 100);
let star2 = new Sprite("./Images/Sprites/star.png", 1, 100, 100);
let star3 = new Sprite("./Images/Sprites/star.png", 1, 100, 100);
let star4 = new Sprite("./Images/Sprites/star.png", 1, 100, 100);
let star5 = new Sprite("./Images/Sprites/star.png", 1, 100, 100);

let background1=new backgroundSprite("./Images/Backgrounds/game_background_4.png",[0,0],ctx.canvas.width,ctx.canvas.height);
let background2=new backgroundSprite("./Images/Backgrounds/game_background_4.png",[0,0],ctx.canvas.width,ctx.canvas.height);
let background3=new backgroundSprite("./Images/Backgrounds/game_background_3.1.png",[0,0],ctx.canvas.width,ctx.canvas.height);
let background4=new backgroundSprite("./Images/Backgrounds/game_background_3.1.png",[0,0],ctx.canvas.width,ctx.canvas.height);
let background5=new backgroundSprite("./Images/Backgrounds/game_background_1.png",[0,0],ctx.canvas.width,ctx.canvas.height);
let background6=new backgroundSprite("./Images/Backgrounds/game_background_1.png",[0,0],ctx.canvas.width,ctx.canvas.height);

let horse;
let rain = new Rain(500);

let toRadians=Math.PI/180;
let fps, lastRender;
let count = 0;
let sceneLength = 200;

rain.init();
initCharacter();

let moonptx =0;
let hillptx =0;
let horseptx = 0;
let starprz =0;  //rotation
let psx =psy= 1; //scaling