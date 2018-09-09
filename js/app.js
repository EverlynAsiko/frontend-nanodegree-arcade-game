// Enemies our player must avoid
class Enemy{
    constructor(x,y){
        this.sprite= 'images/enemy-bug.png';
        this.x=x;
        this.y=y;
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    //Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //};
    
    update(dt){
        this.isOutOfBoundsX=this.x > 5;
        this.isOutOfBoundsY=this.y < 1;
        if(this.isOutOfBoundsX){
            this.x = -1;
        }
        else {
            this.x += dt;
        }
    }
    // Draw the enemy on the screen, required method for game
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
    }

    checkCollisions(playerOrEnemy){
        if(this.y===playerOrEnemy.y){
            if(this.x>=playerOrEnemy.x - 0.5 && this.x<=playerOrEnemy.x + 0.5){
                return true;
            }
        }
        else {
            return false;
        }
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player{
    constructor(){
        this.sprite='images/char-boy.png';
        this.x=2;
        this.y=5;
    }

    update(){

    }

    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
    }

    handleInput(input){
        switch(input){
            case 'left':
                this.x = this.x > 0 ? this.x - 1 : this.x;
                break;
            case 'up':
                this.y = this.y > 0 ? this.y - 1 : this.y;
                break;
            case 'right':
                this.x = this.x < 4 ? this.x + 1 : this.x;
                break;
            case 'down':
                this.y = this.y < 5 ? this.y + 1 : this.y;
                break;
            default:
                break;    
        }
    }
}


// Now instantiate your objects.

const player=new Player();
// Place all enemy objects in an array called allEnemies
const allEnemies=[...Array(3)].map((_,i)=>new Enemy(0,i+1));
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
