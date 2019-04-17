class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    $("li").click( (e) => {
      this.makeMove($(e.target));
    });
  }

  makeMove($square) {
    try {
      let player = this.game.currentPlayer;
      this.game.playMove($square.data("pos"));
      $square.addClass(player);
      $square.addClass('played');
      $square.append(`${player}`);
      if (this.game.isOver()) {
        if (this.game.winner()) {
            $(`.${this.game.winner()}`).addClass("winner");
            const loser = this.game.winner() === 'x' ? '.o' : '.x';
            $(loser).addClass("loser");
            this.$el.append(`<h1>You win, ${this.game.winner()}!`);
        } else {
          this.$el.append("<h1>Draw</h1>");
        }
      }
    } catch (e) {
      alert(e.msg);
    }
    
    
  }

  setupBoard() {
    let $grid = $("<ul>");
    for(let i =0; i <3; i++){
        for(let j= 0; j <3; j++){
          let $square = $( "<li class='square'></li>" );
          $square.data("pos",[i,j]);
          $grid.append($square);
      }
    }
    this.$el.append($grid);
  }
}

module.exports = View;
