'use strict';

var canvas;
var context;

var lines;
const nbLines = 10;

function init() {
  canvas = document.getElementById('drawzone');
  context = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  initLines();

  animate();
}

function initLines() {
  lines = [];

  for (let i = 1; i <= nbLines; i++) {
    lines.push({
      x : random(0, canvas.width),
      y : random(0, canvas.height),
      speedX : random(-6, 6),
      speedY : random(-6, 6),
      color : ['yellow', 'blue', 'red'][Math.round(Math.random() * 2)]
    });
  }
}

function update() {
  for (let i = 0, line; i < lines.length; i++) {
    line = lines[i];

    line.x += line.speedX;
    line.y += line.speedY;

    if (line.x > canvas.width || line.x < 0) line.speedX *= -1;
    if (line.y > canvas.height || line.y < 0) line.speedY *= -1;
  }
}

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.lineWidth = 15;
  for (let i = 0, line; i < lines.length; i++) {
    line = lines[i];

    context.strokeStyle = line.color;

    context.beginPath();
    context.moveTo(line.x, 0);
    context.lineTo(line.x, canvas.height);
    context.moveTo(0, line.y);
    context.lineTo(canvas.width, line.y);
    context.stroke();
    context.closePath();
  }
}

function animate() {
  requestAnimationFrame(animate);

  update();
  render();
}

document.addEventListener('DOMContentLoaded', init);

function random(min, max) {
  return Math.round( Math.random() * (max - min) + min );
}