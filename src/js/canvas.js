import { dropOverlay } from "./main";

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
canvas.height = innerHeight;
canvas.width = innerWidth;
// ctx.fillStyle = "black";
// ctx.fillRect(0, 0, canvas.width, canvas.height);

let particles = [];
let textData;
let mouse = { x: innerWidth + 150, y: innerHeight / 2, radius: 125 };

let fontSize = 48;
let xScale = 4;
let yScale = 4;

// ctx.strokeStyle = "orange";
// ctx.strokeRect(innerWidth / 2 - 105, innerHeight / 2 - 45, 225, 55);

function getTextImageData() {
  //paint text on canvas, record data, clear canvas

  ctx.fillStyle = "red";
  ctx.font = `${fontSize}px Verdana`;
  ctx.fillText("Welcome", canvas.width / 2 - 100, canvas.height / 2);

  textData = ctx.getImageData(
    innerWidth / 2 - 105,
    innerHeight / 2 - 45,
    225,
    55
  );
  ctx.clearRect(innerWidth / 2 - 105, innerHeight / 2 - 45, 225, 55);
}

getTextImageData();

console.log("TextData", textData);

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 3;
    this.baseX = x;
    this.baseY = y;
    this.colorNum = (Math.random() * 50 + 100) | 0;
    this.color = `hsl(${this.colorNum},100%,50%)`;
    this.density = Math.random() * 8;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
  }

  update(mouse) {
    let distX = mouse.x - this.x;
    let distY = mouse.y - this.y;
    let maxDistance = mouse.radius;
    let distance = Math.sqrt(distX * distX + distY * distY);
    let dirX = distX / distance;
    let dirY = distY / distance;

    let force = (maxDistance - distance) / maxDistance;
    if (distance < maxDistance) {
      this.x -= dirX;
      this.y -= dirY;
      let color = this.colorNum;
      color -= Math.random() * 4;
      this.colorNum = color;
      this.color = `hsl(${this.colorNum},100%,50%)`;
    } else {
      if (this.x != this.baseX) {
        let dx = this.baseX - this.x;
        this.x += dx / 10;
      }
      if (this.y != this.baseY) {
        let dy = this.baseY - this.y;
        this.y += dy / 10;
      }
    }
  }
}

// onmousemove = (e) => {
//   mouse.x = e.clientX;
//   mouse.y = e.clientY;
// };

// onmouseout = (e) => {
//   mouse.x = -50000;
//   mouse.y = -50000;
// };

let yOffset = 35;
let xOffset = 10;

function initParticles() {
  console.log(innerWidth);
  for (let x = 0, x2 = textData.width; x < x2; x++) {
    for (let y = 0, y2 = textData.height; y < y2; y++) {
      if (textData.data[y * textData.width * 4 + x * 4 + 3] > 128) {
        let posX = x + xOffset;
        let posY = y + yOffset;
        particles.push(new Particle(posX * xScale, posY * yScale));
      }
    }
  }
}

// initParticles();
function animation() {
  // ctx.fillStyle = "black";
  // ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.draw();
    particle.update(mouse);
  });
  requestAnimationFrame(animation);
}

animation();

onresize = (e) => {
  console.log("resizing");
  canvas.height = innerHeight;
  canvas.width = innerWidth;

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // if (innerWidth > 1050) {
  //   console.log("large screen");
  //   fontSize = 28;
  //   xScale = 10;
  //   yScale = 10;
  // } else if (innerWidth > 750) {
  //   console.log("tablet screen");
  //   fontSize = 28;
  //   xScale = 4;
  //   yScale = 4;
  // } else if (innerWidth < 550) {
  //   console.log("mobile");
  //   fontSize = 20;
  //   xScale = 1;
  //   yScale = 1;
  // }
};

onload = () => {
  console.log("window loaded", innerWidth);
  if (innerWidth > 1050) {
    console.log("large screen");
    // fontSize = 28;
    xScale = 6;
    yScale = 6;
    xOffset = 0;
    yOffset = 20;
  } else if (innerWidth > 875) {
    console.log("tablet screen");
    // fontSize = 28;
    xScale = 4;
    yScale = 8;
    xOffset = 10;
    yOffset = 5;
  } else if (innerWidth > 550) {
    console.log("tablet screen");
    // fontSize = 28;
    xScale = 2;
    yScale = 10;
    xOffset = 65;
    yOffset = 5;
  } else {
    console.log("mobile");
    xScale = 1.5;
    yScale = 7;
    xOffset = 5;
    yOffset = 15;
  }
  initParticles();
};

function moveMouse() {
  for (let i = 0; i <= innerWidth + 100; i++) {
    let total = mouse.x;
    setTimeout(() => {
      total -= i;
      mouse.x = total - 150;
      // console.log("MouseX", mouse.x);
      if (i == innerWidth + 99) {
        dropOverlay();
      }
    }, i * 5);
  }
}

moveMouse();
