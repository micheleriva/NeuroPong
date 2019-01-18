/**
 * Canvas Variables
 */
const canvas = document.getElementById('game')
const ctx    = canvas.getContext('2d')

/**
 * Application Costants
 */

const CANVAS_WIDTH  = canvas.width
const CANVAS_HEIGHT = canvas.height

/**
 * Ball position variables
 */

let x  = CANVAS_WIDTH / 2
let y  = CANVAS_HEIGHT - 50
let dx = 2
let dy = -2

/**
 * Ball variables
 */
const BALL_RADIUS = 10

/**
 * Paddle variables
 */

const PADDLE_WIDTH  = 100
const PADDLE_HEIGHT = 10
const PADDLE_DX     = 7 // Each time dx key is pressed, move the paddle for 7 pixels
let PADDLE_X        = (CANVAS_WIDTH - PADDLE_WIDTH) / 2

/**
 * User controls
 */
let rightPressed
let leftPressed

function keyDownHandler(event) {
  if (event.keyCode === 39) {
    rightPressed = true
  } 
  if (event.keyCode === 37) {
    leftPressed = true
  }
}

function keyUpHandler(event) {
  if (event.keyCode === 39) {
    rightPressed = false
  } 
  if (event.keyCode === 37) {
    leftPressed = false
  }
}

document.addEventListener('keydown', keyDownHandler, false)
document.addEventListener('keyup',   keyUpHandler,   false)

/**
 * Canvas interaction
 */

function createBall() {
  ctx.beginPath()
  ctx.arc(
    x,            // Initial X position
    y,            // Initial Y position
    BALL_RADIUS,  // Ball radius 
    0,            // Arc start angle 
    Math.PI * 2   // Arc end angle
  )
  ctx.fillStyle = "#fff"
  ctx.fill()
  ctx.closePath()
}

function createPaddle() {
  ctx.beginPath()
  ctx.rect(
    PADDLE_X,             // Initial X rect position
    CANVAS_HEIGHT - 40,   // Initial Y rect position
    PADDLE_WIDTH,         // Paddle width
    PADDLE_HEIGHT         // Paddle height
  )
  ctx.fillStyle = "#fff"
  ctx.fill()
  ctx.closePath()
}

function draw() {

  // Clear canvas each frame
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

  // Then recreate the ball and paddle objects with new coordinates
  createBall()
  createPaddle()

  // Handle the case we're hitting left or right side of our application frame
  if (x + dx > CANVAS_WIDTH - BALL_RADIUS || x + dx < BALL_RADIUS) {
    dx = -dx
  }

  // Handle the ball hitting the paddle
  if(
    y + dy < BALL_RADIUS ||
    (
         y + dx > CANVAS_HEIGHT - PADDLE_HEIGHT - BALL_RADIUS
      && x + dx > PADDLE_X
      && dx < PADDLE_X + PADDLE_WIDTH
    )
  ) {
    dy = -dy
  }

  // Handle the case we're not hitting the ball with the paddle
  if (y + dy > CANVAS_HEIGHT) {
    location.reload()
  }

  // Handle the case we're hitting top side of our application frame
  if (y + dy < BALL_RADIUS) {
    dy = -dy
  }

  // Handle right key press
  if (rightPressed && (PADDLE_X + PADDLE_WIDTH) < CANVAS_WIDTH) {
    PADDLE_X += PADDLE_DX
  }
  
  // Handle left key press
  if (leftPressed && PADDLE_X > 0) {
    PADDLE_X -= PADDLE_DX
  }


  // Move ball in the empty space
  x += dx
  y += dy

  // Recoursively call draw function
  requestAnimationFrame(draw)
}

requestAnimationFrame(draw)