const HanoiGame = require('./game.js');
const View = require('./hanoi-view.js');

$(() => {
  const rootEl = $('.toh');
  const game = new HanoiGame();
  let view = new View(game, rootEl);
});

