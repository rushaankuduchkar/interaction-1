let circleX, circleY, circleRadius;
let eyeballX, eyeballY;
let targetX, targetY;
let eyeRadius;
let circleColor;
let isHovered = false;
let isClicked = false;
let minCircleRadius;
let easing = 0.05;
let backgroundColor;
let hoverColor;
let originalColor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  circleX = width / 2;
  circleY = height / 2;
  circleRadius = 200;
  minCircleRadius = 50;
  eyeRadius = 30;
  
  eyeballX = circleX;
  eyeballY = circleY;
  
  originalColor = color(66, 135, 245);
  hoverColor = color(245, 111, 66);
  circleColor = originalColor;
  backgroundColor = color(77, 71, 69);

  targetX = eyeballX;
  targetY = eyeballY;
}

function draw() {
  background(lerpColor(backgroundColor, color(0), 0.03));

  isHovered = dist(mouseX, mouseY, circleX, circleY) < circleRadius / 2;

  if (isHovered) {
    circleColor = lerpColor(circleColor, hoverColor, 0.1);
  } else {
    circleColor = lerpColor(circleColor, originalColor, 0.1);
  }

  fill(circleColor);
  noStroke();
  ellipse(circleX, circleY, circleRadius);

  let angle = atan2(mouseY - eyeballY, mouseX - eyeballX);
  targetX = circleX + cos(angle) * (circleRadius / 4);
  targetY = circleY + sin(angle) * (circleRadius / 4);
  
  eyeballX += (targetX - eyeballX) * easing;
  eyeballY += (targetY - eyeballY) * easing;

  fill(333);
  ellipse(eyeballX, eyeballY, eyeRadius * 2);
  
  fill(0);
  ellipse(eyeballX, eyeballY, eyeRadius);

  if (isClicked) {
    circleRadius += (minCircleRadius - circleRadius) * 0.1;
    if (abs(circleRadius - minCircleRadius) < 0.5) {
      isClicked = false;
    }
  }
}

function mousePressed() {
  if (isHovered && !isClicked) {
    isClicked = true;
  }
}
