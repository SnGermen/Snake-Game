const playBoard = document.querySelector(".play_board")
const scoreElem = document.querySelector(".game_score")
const highScoreElem = document.querySelector(".game_scor__hight")

let foodX, foodY
let snakeX = 15, snakeY = 15
let snakeBody = []
let velocityX = 0, velocityY = 0
let gameOver = false
let setIntervalId
let score = 0

let highScore = localStorage.getItem("game_scor__high") || 0
highScoreElem.innerHTML = `High Score: ${highScore}`
scoreElem.innerHTML = `Score: ${score}`;


const changeFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30) + 1
  foodY = Math.floor(Math.random() * 30) + 1
  console.log(foodX, foodY)
}

const handleGameOver = () => {
  clearInterval(setIntervalId)
  alert("Game over")
  location.reload()
}
const changeDirection = (e) => {
  if (e.key === "ArrowUp" && velocityY != 1) {
    velocityX = 0    // x ->  y !
    velocityY = -1
  } else if (e.key === "ArrowDown" && velocityY != -1) {
    velocityX = 0
    velocityY = 1
  } else if (e.key === "ArrowLeft" && velocityX != 1) {
    velocityX = -1
    velocityY = 0
  } else if (e.key === "ArrowRight" && velocityX != -1) {
    velocityX = 1
    velocityY = 0
  }


}

const initGame = () => {
  if (gameOver) {
    handleGameOver()
  }

  let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

  if (snakeX === foodX && snakeY === foodY) {
    changeFoodPosition()
    snakeBody.push([foodX, foodY])
    score++

    highScore = score >= highScore ? score : highScore
    localStorage.setItem("game_scor__high", highScore)
    scoreElem.innerHTML = `Score ${score}`

    highScoreElem.innerHTML = `High Score: ${highScore}`
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1]
  }
  snakeBody[0] = [snakeX, snakeY]
  snakeX += velocityX
  snakeY += velocityY //  15  - 1 = 9 

  if (snakeX < 0 || snakeX > 30 || snakeY < 0 || snakeY > 30) {
    gameOver = true
  }

  for (let i = 0; i < snakeBody.length; i++) {
    htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
    if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
      gameOver = true
    }  //Если вркдиться в себя

  }
  playBoard.innerHTML = htmlMarkup

}

changeFoodPosition()
setIntervalId = setInterval(initGame, 125)
document.addEventListener("keydown", changeDirection)