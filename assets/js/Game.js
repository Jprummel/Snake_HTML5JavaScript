var snake, pickUp, squareSize, updateDelay, direction, new_direction, addNew, cursors, score, speed;
 
var Game = {
        
        preload: function () {
            //Loads images for sprites that get created
            game.load.image('Snake', './assets/images/snek.png');
            //game.load.image('PickUp', './assets/images/PickUp.png');
            //game.load.scripts('Pickup.js','./assets/js/Pickup.js');
        },
    
        create: function () {
            snake           = [];
            pickUp          = {};
            squareSize      = 15;       //the size of a square/cell the snake parts and pickup images are both 15x15
            score           = 0;        //Players score
            updateDelay     = 0;        //control over update rates
            direction       = 'right';  //starting direction of the snake
            new_direction   = null;     //stores the new direction of the snake
            addNew          = false;    //checks if a pickup has been gathered
 
            keys = game.input.keyboard.createCursorKeys(); //Controls
            
            game.stage.backgroundColor = '#000000'; //Sets the background to black
 
            for (var i = 0; i < 10; i++) {
                //Creates the snake with the given length
                snake[i] = game.add.sprite(150 + i * squareSize, 150, 'Snake');
            }

            //Generate the first pickup
            //this.generatePickUp();
            //GeneratePickUp();
            
        },
 
        update: function () {
            //Checks for keyboard input, if there is any change the direction
            //If the new direction would be the same as the old one don't change direction
            if (keys.right.isDown && direction != 'left') {
                new_direction = 'right';
            } else if (keys.left.isDown && direction != 'right') {
                new_direction = 'left';
            } else if (keys.up.isDown && direction != 'down') {
                new_direction = 'up';
            } else if (keys.down.isDown && direction != 'up') {
                new_direction = 'down';
            }
 
            speed = Math.min(10, Math.floor(score / 5));
 
 
            updateDelay++;
 
            if (updateDelay % (10 - speed) == 0) {
                var firstCell = snake[snake.length - 1],
                    lastCell = snake.shift(),
                    oldLastCellx = lastCell.x,
                    oldLastCelly = lastCell.y;
 
                if (new_direction) {
                    direction = new_direction;
                    new_direction = null;
                }
 
                if (direction == 'right') {
                    lastCell.x = firstCell.x + squareSize;
                    lastCell.y = firstCell.y;
                } else if (direction == 'left') {
                    lastCell.x = firstCell.x - squareSize;
                    lastCell.y = firstCell.y;
                } else if (direction == 'up') {
                    lastCell.x = firstCell.x;
                    lastCell.y = firstCell.y - squareSize;
                } else if (direction == 'down') {
                    lastCell.x = firstCell.x;
                    lastCell.y = firstCell.y + squareSize;
                }
                
                this.PickUpCollision();
                this.selfCollision(firstCell);
                this.wallCollision(firstCell);       
 
                snake.push(lastCell);
                firstCell = lastCell;
            }
 
            if (addNew) {
                snake.unshift(game.add.sprite(oldLastCellx, oldLastCelly, 'Snake'));
                addNew = false;
            }
    },
 
 
    /*generatePickUp: function () {
        var randomX = Math.floor(Math.random() * 40) * squareSize,
            randomY = Math.floor(Math.random() * 30) * squareSize;
 
        pickUp = game.add.sprite(randomX, randomY, 'PickUp');
    },*/
 
    PickUpCollision: function () {
        //Checks if the player collides with a pickup if it does generate a new pickup
        for (var i = 0; i < snake.length; i++) {
            if (snake[i].x == pickUp.x && snake[i].y == pickUp.y) {
                addNew = true;      //Generate a new pickup
                pickUp.destroy();
                //this.generatePickUp();
                GeneratePickUp();
                score++;
            }
        }
    },
 
    selfCollision: function (head) {
        //Checks if the player hits another part of its own body if it does game state switches to game over
        for (var i = 0; i < snake.length - 1; i++) {
            if (head.x == snake[i].x && head.y == snake[i].y) {
                game.state.start('Game_Over');
            }
        }
    },
 
    wallCollision: function (head) {
        //Checks if the snakes head touches the wall if it does game state switches to game over
        if (head.x >= 800 || head.x < 0 || head.y >= 600 || head.y < 0) {
            game.state.start('Game_Over');
        }
    }
 
 
};