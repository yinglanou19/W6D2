class View {
    constructor(game, el){
        this.game = game;
        this.$el = el;
        this.setupTowers();
        this.render();
        this.bindEvents();
    }

    bindEvents() {
        $("ul").click((e) => {
            this.clickTower($(e.currentTarget));
        });
    }
    
    setupTowers() {
        for (let i = 0; i < 3; i++) {
            const $tower = $(`<ul id="tower-${i}"></ul>`);
            $tower.data("id", i);
            this.$el.append($tower);
            for (let j = 0; j < 3; j++) {
                if (i === 0) {
                    const $disk = $(`<li id="disk-${j}"></li>`);
                    $disk.data("id", i);
                    $("ul").first().append($disk);
                } else if (i > 0) {
                    const $disk = $('<li>');
                    $disk.data("id", i);
                    $(`ul:eq(${i})`).append($disk);
                }
            }
        }
    }

    render(){
        console.log(this.game.print());
        $("li").remove();
        for (let i = 0; i < this.game.towers.length; i++) {
           for (let j = 0; j < this.game.towers[i].length; j++) {
               if (this.game.towers[i][j].length !== 0) {
                   const $disk = $(`<li id="disk-${this.game.towers[i][j] - 1}"></li>`);
                   $(`ul:eq(${i})`).append($disk);
               } 
           }
       }
    }

    clickTower($tower) {
        if (this.first) {
            const second = $tower;
            if (this.game.isValidMove(this.first.data("id"), $tower.data("id"))) {
                this.game.move(this.first.data("id"), $tower.data("id"));
                this.render();
            } else {
                alert("invalid move");
            }
            this.first = '';
        } else {
            this.first = $tower; 
        }
    }
}

module.exports = View; 