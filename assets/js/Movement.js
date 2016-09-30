var direction, new_direction, speed, keys;

var Movement = function () {

    create: function(){
        direction ='right';
        new_direction = null;
    }
    keys = game.input.keyboard.createCursorKeys();
    
    if (keys.right.isDown && direction !== 'left') {
        new_direction = 'right';
    } else if (keys.left.isDown && direction !== 'right') {
        new_direction = 'left';
    } else if (keys.up.isDown && direction !== 'down') {
        new_direction = 'up';
    } else if (keys.down.isDown && direction !== 'up') {
        new_direction = 'down';
    }
    //Game.create(this);
    speed = 10;
};