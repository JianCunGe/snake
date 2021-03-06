const { GRID_SIZE } = require('./constants');

module.exports = {
  initGame,
  gameLoop,
  getUpdatedVelocity
}
function initGame() {
  const state = createGameState();
  randomFood(state);
  return state;
}

function createGameState() {
  return {
    players: [
      {
        pos: {  // position
          x: 3,
          y: 10,
        },
        vel: {// velocity
          x: 1,
          y: 0,
        },
        snake: [
          {x: 1, y: 10},
          {x: 2, y: 10},
          {x: 3, y: 10},
        ],
      },
      {
        pos: {
          x: 18,
          y: 10,
        },
        vel: {
          x: 0,
          y: 0,
        },
        snake: [
          {x: 20, y: 10},
          {x: 18, y: 10},
          {x: 19, y: 10},
        ],
      }
    ],
    food: {},
    gridsize: GRID_SIZE,
  };
}

function gameLoop(state) {
  // console.log(state);
  // const playerOne = state.player;
  if(!state) return;

  const playerOne = state.players[0];
  const playerTwo = state.players[1];

  playerOne.pos.x += playerOne.vel.x;
  playerOne.pos.y += playerOne.vel.y;

  playerTwo.pos.x += playerTwo.vel.x;
  playerTwo.pos.y += playerTwo.vel.y;

  // 是否撞墙
  if(playerOne.pos.x < 0 || playerOne.pos.x > GRID_SIZE || playerOne.pos.y < 0 || playerOne.pos.y > GRID_SIZE) {
    return 2;
  }

  if(playerTwo.pos.x < 0 || playerTwo.pos.x > GRID_SIZE || playerTwo.pos.y < 0 || playerTwo.pos.y > GRID_SIZE) {
    return 1;
  }

  // 是否吃到实物
  if(state.food.x === playerOne.pos.x && state.food.y === playerOne.pos.y) {
    playerOne.snake.push({ ...playerOne.pos });
    playerOne.pos.x += playerOne.vel.x;
    playerOne.pos.y += playerOne.vel.y;
    randomFood(state);
  }

  if(state.food.x === playerTwo.pos.x && state.food.y === playerTwo.pos.y) {
    playerTwo.snake.push({ ...playerTwo.pos });
    playerTwo.pos.x += playerTwo.vel.x;
    playerTwo.pos.y += playerTwo.vel.y;
    randomFood(state);
  }

  if(playerOne.vel.x || playerOne.vel.y) {
    console.log('🐍', playerOne.snake);
    for (let cell of playerOne.snake) {
      if(cell.x === playerOne.pos.x && cell.y === playerOne.pos.y) {
        return 2;
      }
    }
    playerOne.snake.push({ ...playerOne.pos });
    playerOne.snake.shift();
  }

  if(playerTwo.vel.x || playerTwo.vel.y) {
    console.log('🐍', playerTwo.snake);
    for (let cell of playerTwo.snake) {
      if(cell.x === playerTwo.pos.x && cell.y === playerTwo.pos.y) {
        return 1;
      }
    }
    playerTwo.snake.push({ ...playerTwo.pos });
    playerTwo.snake.shift();
  }

  return false;
}

function randomFood(state) {
  food = {
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * GRID_SIZE),
  }
  for (var cell of state.players[0].snake) {
    if(cell.x === food.x && cell.y === food.y) {
      return randomFood(state);
    }
  }

  for (var cell of state.players[1].snake) {
    if(cell.x === food.x && cell.y === food.y) {
      return randomFood(state);
    }
  }

  state.food = food;
}

function getUpdatedVelocity(keyCode) {
  switch (keyCode) {
    // left
    case 37: {
      return { x: -1, y: 0 };
    }
    // down
    case 38: {
      return { x: 0, y: -1 };
    }
    // right
    case 39: {
      return { x: 1, y: 0 };
    }
    // up
    case 40: {
      return { x: 0, y: 1 };
    }
  }
}
