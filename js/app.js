let inputDirection = { x: 0, y: 0 };
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 10 }]
const a = 1, b = 18;
let food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
const board = document.querySelector('.board');
let score = 0;
let speed = 5;

function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < (1 / speed)) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snakeArr) {

    // collide with itself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snakeArr[0].x === snakeArr[i].x && snakeArr[0].y === snakeArr[i].y) {
            return true;
        }
    }
    // collide with wall
    if (snakeArr[0].x >= 18 || snakeArr[0].x <= 0 || snakeArr[0].y >= 18 || snakeArr[0].y <= 0) {
        return true;
    }
    return false;
}

function gameEngine() {

    //updating snake and food
    if (isCollide(snakeArr)) {
        inputDirection = { x: 0, y: 0 };
        alert('Game Over . Press enter key to play again.')
        snakeArr = [{ x: 13, y: 10 }]
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
        score = 0;
    }

    // if snake has eaten the food update score and increment length of snake
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        score++;
        snakeArr.unshift({ x: snakeArr[0].x + inputDirection.x, y: snakeArr[0].y + inputDirection.y })
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    // moving snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDirection.x;
    snakeArr[0].y += inputDirection.y;

    board.innerHTML = "";

    // displaying the snake element
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    // displaying the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}


window.requestAnimationFrame(main);
window.addEventListener('keydown', (e) => {
    if (e.key === "ArrowUp" && inputDirection.y != 1) {
        inputDirection.x = 0;
        inputDirection.y = -1;
    }
    if (e.key === "ArrowDown" && inputDirection.y != -1) {
        inputDirection.x = 0;
        inputDirection.y = 1;
    }
    if (e.key === "ArrowRight" && inputDirection.x != -1) {
        inputDirection.x = 1;
        inputDirection.y = 0;
    }
    if (e.key === "ArrowLeft" && inputDirection.x != 1) {
        inputDirection.x = -1;
        inputDirection.y = 0;
    }
})