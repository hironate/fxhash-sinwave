// Hironate (Hiren Kavad)
// https://github.com/hironate/fxhash-sinwave.git
// Date : 28th Jan 2023

let xspacing = randomBetween(1, 8); // How far apart should each horizontal location be spaced
let w; // Width of entire wave
let theta = 0.0; // Start angle at 0
let amplitude = new Array(5); // Height of wave
let dx = new Array(5); // Value for incrementing X, to be calculated as a function of period and xspacing
let yvalues; // Using an array to store height values for the wave (not entirely necessary)
const colorR = randomBetween(0, 255);
const colorG = randomBetween(0, 255);
const colorB = randomBetween(0, 255);
const numberOfWaves = randomBetween(10, 5000);

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(40);
  colorMode(RGB, 255, 255, 255, 100);
  w = width + 20;
  for (let i = 0; i < numberOfWaves; i++) {
    amplitude[i] = randomBetween(100, 250);
    let period = randomBetween(150, 1500);
    dx[i] = (TWO_PI / period) * xspacing;
  }
  yvalues = new Array(floor(w / xspacing));
}

function draw() {
  background(0);
  calcWave();
  renderWave();
}

function calcWave() {
  theta += randomBetween(0.02, 0.03);

  // For every x value, calculate a y value with sine function
  let x = theta;
  for (let i = 0; i < yvalues.length; i++) {
    for (let j = 0; j < numberOfWaves; j++) {
      yvalues[i] = sin(x) * amplitude[j];
      x += dx[j];
    }
  }
}

function randomBetween(min, max) {
  return fxrand() * (max - min) + min;
}

function renderWave() {
  stroke(255);
  fill(colorR, colorG, colorB);
  // A simple way to draw the wave with an ellipse at each location
  for (let x = 0; x < yvalues.length; x++) {
    ellipse(x * xspacing, height / 2 + yvalues[x], 16, 16);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
