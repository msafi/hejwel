'use strict';

angular.module('hejwel')

.service('car',
  function(config) {
    var game
    var controls

    var car = {}
    car.p = {}

    car.setup = function(game_) {
      game = game_
      game.load.image('car', 'assets/car.png')
    }

    car.create = function() {
      car.p = game.add.sprite(100, game.world.height / 2, 'car')
      game.physics.enable(car.p)
      controls = game.input.keyboard.createCursorKeys()
      car.p.anchor.setTo(0.6, 0.5);
    }

    car.update = function() {
      car.p.body.velocity.x = 0
      car.p.body.velocity.y = 0
      car.p.body.angularVelocity = 0
      car.p.body.speed = 0

      if (controls.up.isDown) {
        var speed = 1000 // pixels per frame.
        game.physics.arcade.velocityFromAngle(car.p.angle, speed, car.p.body.velocity);

        if (controls.left.isDown) {
          car.p.body.angularVelocity -= 200
        }
        else if (controls.right.isDown) {
          car.p.body.angularVelocity += 200
        }
      }
    }

    car.getSpeed = function() {
      var meter = 20 // in pixels
      var hour = 60 * 60 // in seconds
      var kilometer = 1000 // in meters
      var speed

      // Convert from pixels per second to KMPH
      speed = ((car.p.body.speed / 20) * hour) / kilometer

      return Math.round(speed)
    }

    return car
})