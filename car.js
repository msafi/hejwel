'use strict';

angular.module('hejwel')

.service('car',
  function(config, powertrain, drivingEnvironment) {
    var game

    var car = {}
    car.p = {}

    car.setup = function(game_) {
      game = game_
      game.load.image('car', 'assets/car.png')
    }

    car.create = function() {
      car.p = game.add.sprite(game.world.width / 2, game.world.height / 2, 'car')
      game.physics.enable(car.p)
      car.p.body.collideWorldBounds = true

      car.state = {}
      car.state.traction = 0
      car.state.velocity = 0
      car.state.acceleration = 0
    }

    car.setVelocity = function(level) {
      // Gas pedal or brake pedal?
      var pedalLevel = (level >= 0) ? config.car.pedalLevels[level] : config.car.brake

      car.state.velocity += car.state.acceleration

      car.state.traction = powertrain.getTraction(pedalLevel)
      car.state.acceleration = drivingEnvironment.getPossibleAcceleration(car.state)

      // Even if acceleration brought velocity to below zero (i.e. braking), actual velocity cannot be lower than zero.
      if (car.state.velocity < 0)
        car.state.velocity = 0
    }

    car.update = function() {
      var isDown = game.input.keyboard.isDown.bind(game.input.keyboard)

      if (isDown(Phaser.Keyboard.C) || isDown(Phaser.Keyboard.DOWN)) {
        car.setVelocity(-1)
      } else if (isDown(Phaser.Keyboard.F) || isDown(Phaser.Keyboard.UP)) {
        car.setVelocity(4)
      } else if (isDown(Phaser.Keyboard.D)) {
        car.setVelocity(3)
      } else if (isDown(Phaser.Keyboard.S)) {
        car.setVelocity(2)
      } else if (isDown(Phaser.Keyboard.A)) {
        car.setVelocity(1)
      } else {
        car.setVelocity(0)
      }

      car.p.body.velocity = game.physics.arcade.velocityFromAngle(car.p.angle, car.state.velocity)
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
  }
)