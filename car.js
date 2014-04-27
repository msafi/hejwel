'use strict';

angular.module('hejwel')

  .service('car',
  function(config) {
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
//      car.p.anchor.setTo(0.3, 0.5)

      car.state = {}
      car.state.gearStick = config.car.gearStick.forward

      car.acceleration = {}
      car.acceleration.module = 0
      car.velocity_module = 0
      car.acceleration.traction = 0
      car.acceleration.maxTraction = config.car.rollCoeff * config.car.maxSpeed +
        config.car.dragCoeff * config.car.maxSpeed * config.car.maxSpeed;

      car.angularMovement = {}
      car.angularMovement.velocity = 0
      car.angularMovement.acceleration = 0

      car.f = {}
      car.f.setVelocity = function(newModule) {
        if (newModule < config.car.minSpeed) {
          newModule = 0;
        }
        car.velocity_module = newModule;
        game.physics.arcade.velocityFromAngle(car.p.angle, newModule, car.p.body.velocity);
      }
      car.f.setTraction = function(percent) {
        car.acceleration.traction = percent * car.acceleration.maxTraction
      }
      car.f.updateAcceleration = function() {
        var dragForce = config.car.dragCoeff * car.velocity_module * car.velocity_module
        var rollForce = config.car.rollCoeff * car.velocity_module
        car.acceleration.module = car.acceleration.traction - dragForce - rollForce
      }
      car.f.setAngularVelocity = function(newAV) {
        if (car.angularMovement.acceleration == config.car.angularAccelerations.left
          && newAV < config.car.angularMaxVelocities.left) {
          newAV = config.car.angularMaxVelocities.left;
        }
        if (car.angularMovement.acceleration == config.car.angularAccelerations.right
          && newAV > config.car.angularMaxVelocities.right) {
          newAV = config.car.angularMaxVelocities.right;
        }
        if (car.angularMovement.acceleration == config.car.angularAccelerations.sharpLeft
          && newAV < config.car.angularMaxVelocities.sharpLeft) {
          newAV = config.car.angularMaxVelocities.sharpLeft;
        }
        if (car.angularMovement.acceleration == config.car.angularAccelerations.sharpRight
          && newAV > config.car.angularMaxVelocities.sharpRight) {
          newAV = config.car.angularMaxVelocities.sharpRight;
        }
        car.angularMovement.velocity = newAV;
        car.p.body.angularVelocity = car.getSpeed() * Math.sin(newAV);
      }
      car.f.setAngularAcceleration = function(newAA) {
        car.angularMovement.acceleration = newAA;
      }
      car.f.updateAngularVelocity = function() {
        if (car.angularMovement.acceleration != config.car.angularAccelerations.straight) {
          car.f.setAngularVelocity(car.angularMovement.velocity + car.angularMovement.acceleration);
        } else {
          if (car.angularMovement.velocity > 0) {
            if (car.angularMovement.velocity > config.car.angularReset) {
              car.f.setAngularVelocity(car.angularMovement.velocity - config.car.angularReset);
            } else {
              car.f.setAngularVelocity(0);
            }
          } else if (car.angularMovement.velocity < 0) {
            if ((-car.angularMovement.velocity) > config.car.angularReset) {
              car.f.setAngularVelocity(car.angularMovement.velocity + config.car.angularReset);
            } else {
              car.f.setAngularVelocity(0);
            }
          }
        }

      }
    }

    car.update = function() {
      var isDown = game.input.keyboard.isDown
      isDown = isDown.bind(game.input.keyboard)

      // First process user input
      if (isDown(Phaser.Keyboard.C) || isDown(Phaser.Keyboard.DOWN)) {
        car.f.setTraction(config.car.accelerations.braking);
      } else if (isDown(Phaser.Keyboard.F) || isDown(Phaser.Keyboard.UP)) {
        car.f.setTraction(config.car.accelerations.four);
      } else if (isDown(Phaser.Keyboard.D)) {
        car.f.setTraction(config.car.accelerations.three);
      } else if (isDown(Phaser.Keyboard.S)) {
        car.f.setTraction(config.car.accelerations.two);
      } else if (isDown(Phaser.Keyboard.A)) {
        car.f.setTraction(config.car.accelerations.one);
      } else {
        car.f.setTraction(config.car.accelerations.zero);
      }

      if (isDown(Phaser.Keyboard.J) || isDown(Phaser.Keyboard.LEFT)) {
        car.f.setAngularAcceleration(config.car.angularAccelerations.sharpLeft);
      } else if (isDown(186) || isDown(Phaser.Keyboard.RIGHT)) {
        car.f.setAngularAcceleration(config.car.angularAccelerations.sharpRight);
      } else if (isDown(Phaser.Keyboard.K)) {
        car.f.setAngularAcceleration(config.car.angularAccelerations.left);
      } else if (isDown(Phaser.Keyboard.L)) {
        car.f.setAngularAcceleration(config.car.angularAccelerations.right);
      } else {
        car.f.setAngularAcceleration(config.car.angularAccelerations.straight);
      }

      //then update speed and acceleration
      car.f.setVelocity(car.velocity_module + car.acceleration.module)
      car.f.updateAcceleration()
      car.f.updateAngularVelocity()
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