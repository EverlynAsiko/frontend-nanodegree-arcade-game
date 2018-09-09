//Citing when help was gotten from 
//1. https://zoom.us/recording/play/aulotDlzKFegQFIJTaTzKgWvNkVsYtlwO454vL1UPE1Cm6lOUBQCtfVurPOIAGAS?startTime=1529542978000
//2. https://matthewcranford.com/arcade-game-walkthrough-part-6-collisions-win-conditions-and-game-resets/
//3. https://matthewcranford.com/arcade-game-walkthrough-part-5-adding-enemies/


//Parent class for all objects in the game
class Entity{
    constructor(){
        this.x = 2;
        this.y = 5;
        this.sprite = 'images/char-boy.png';
    }

    update(dt){      
        this.isOutOfBoundsX=this.x > 5;
        this.isOutOfBoundsY=this.y < 1;  
    }

    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
    }
}

//Enemy class
class Enemy extends Entity{
    constructor(x,y,speed){
        super();
        this.sprite = 'images/enemy-bug.png';
        //Allows for setting the start points and the speed when enemy is instantiated
        this.x = x;
        this.y = y;
        this.speed = speed;
    }
        
    update(dt){
        super.update(dt);
        //Enemy sprites kept in a loop
        if(this.isOutOfBoundsX){
            this.x = -1;
        }
        else {
            this.x += this.speed * dt;
        }
    }    

    //Function to check if entities have bumped into each other
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

//player class
class Player extends Entity{
    constructor(){
        super();
        //Variables to check if player has won
        this.moving=false;
        this.win=false;
    }

    update(dt){
        super.update(dt);
        //Check if player has reached water point for them to win the game
        if(this.isOutOfBoundsY && !this.moving && !this.win){
            alert("Win");
            this.win=true;
        }
    }

    render(){
        super.render();
        this.moving = false;
    }

    //function to determine how the player moves
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
        this.moving = true;
    }
}

//Instance of player created
const player=new Player();

//Instances of enemies created
const enemy1=new Enemy(0,1,1);
const enemy2=new Enemy(0,2,4);
const enemy3=new Enemy(0,3,2);
const enemy4=new Enemy(4,1,1);

//Array for all enemies
const allEnemies=[];
allEnemies.push(enemy1,enemy2,enemy3,enemy4);

// This listens for key presses and sends the keys to your Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
