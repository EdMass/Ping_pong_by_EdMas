(function(){
    self.Board = function( width, height){
        this.width = width;
        this.height = height;
        this.playing = false;
        this.game_over = false;
        this.ball = null;
        this.bars = [];
    }

    self.Board.prototype = {
        get elements(){
            var elements = this.bars.map(function(bar){ return bar; });
            elements.push(this.ball);
            return elements;
        }
    }

})();

(function(){
    self.Ball = function(x,y,radius,board){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed_y = 0;
        this.speed_x = 3;
        this.board = board;
        this.direction = 1;

        board.ball = this;
        this.kind = "circle";

        
    }

    self.Ball.prototype = {
        move: function() {
            this.x += (this.speed_x * this.direction);
            this.y += (this.speed_y);
        }
    }

})();

(function(){
    self.Bar = function (x,y,width,height,board){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.board = board;
        this.board.bars.push(this);
        this.kind = "rectangle";
        this.speed = 16;
    }

    self.Bar.prototype = {
        down : function(){
            this.y += this.speed;
        },
        up : function(){
            this.y -= this.speed;
        },
        toString: function(){
            return "x: "+this.x+" y: "+this.y;
        }
    }

})();

(function(){
    self.BoardView = function(canvas,board){
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.board = board;
        this.canvas.height = board.height;
        this.ctx = canvas.getContext("2d");
    }

    self.BoardView.prototype={
        clean: function(){
            this.ctx.clearRect(0,0,this.board.width,this.board.height);
        },

        draw: function(){
            for(var i = this.board.elements.length -1; i>=0; i--){
                var el = this.board.elements[i];

                draw(this.ctx,el);
            }
        },

        play: function(){
            if (this.board.playing){
                this.clean();
                this.draw();
                this.board.ball.move();
            }
            
        }

    }

    function draw(ctx, element){
        
        switch(element.kind){
            case "rectangle":
                ctx.fillRect(element.x,element.y,element.width,element.height);
                break;
            case "circle":
                ctx.beginPath();
                ctx.arc(element.x,element.y,element.radius,0,7);
                ctx.fill();
                ctx.closePath();
                break;
        }
        
    }
})();

var board = new Board(800,400);
var bar = new Bar(20,100,40,100,board);
var bar_2 = new Bar(740,100,40,100,board);
var canvas = document.getElementById('canvas');
var board_view = new BoardView(canvas,board);
var ball = new Ball(350,100,9,board);

window.requestAnimationFrame(controller);
setTimeout(function(){
    
})

document.addEventListener("keydown", function(ev){
    
    if (ev.key == "ArrowUp" ){
        ev.preventDefault();
        bar.up();
    }
    else if(ev.key == "ArrowDown" ){
        ev.preventDefault();
            bar.down();
    }
    //w
    else if (ev.key == "w" ){
        ev.preventDefault();
        bar_2.up();
    }
    //s
    else if(ev.key == "s" ){
        ev.preventDefault();
        bar_2.down();
    }
    //pause
    else if(ev.key == " " ){
        ev.preventDefault();
        board.playing = !board.playing;

    }

    console.log(ev.key);
});

window.addEventListener("load",controller);

function controller(){
    
    window.requestAnimationFrame(controller);
    board_view.play();
    
}