var pickUp, squareSize;

var GeneratePickUp = {
    preload: function () {
        this.add.image('PickUp', './assets/images/PickUp.png');
    },

    create: function () {
        pickUp = {};
        squareSize = 15;
    },
    
    generate: function () {
        var randomX = Math.floor(Math.random() * 40) * squareSize,
            randomY = Math.floor(Math.random() * 30) * squareSize;
        pickUp = this.add.sprite(randomX, randomY, 'PickUp');
    }

    this.generate();
};