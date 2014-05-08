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
      car.state.rpm = 0

      car.maxVelocities = {}
        var rpm = config.car.switchRpm
        car.state.gear = 1
        car.maxVelocities.g1 = 20 * 2 * Math.PI * config.car.wheelRadius * rpm / (60 * car.getTotalGearRatio())
        car.state.gear = 2
        car.maxVelocities.g2 = 20 * 2 * Math.PI * config.car.wheelRadius * rpm / (60 * car.getTotalGearRatio())
        car.state.gear = 3
        car.maxVelocities.g3 = 20 * 2 * Math.PI * config.car.wheelRadius * rpm / (60 * car.getTotalGearRatio())
        car.state.gear = 4
        car.maxVelocities.g4 = 20 * 2 * Math.PI * config.car.wheelRadius * rpm / (60 * car.getTotalGearRatio())
        car.state.gear = 5
        car.maxVelocities.g5 = 20 * 2 * Math.PI * config.car.wheelRadius * rpm / (60 * car.getTotalGearRatio())

      car.state.gear = 1
    }

    car.getMaxVelocityForCurrentGear = function() {
        switch (car.state.gear) {
            case 1: return car.maxVelocities.g1;
            case 2: return car.maxVelocities.g2;
            case 3: return car.maxVelocities.g3;
            case 4: return car.maxVelocities.g4;
            case 5: return car.maxVelocities.g5;
            default: return 0;
        }
    }

    car.getTotalGearRatio = function() {
        var G = config.car.gearRatios.dR;
        var g;
        switch (car.state.gear) {
            case 1:
                g = config.car.gearRatios.g1;
                break;
            case 2:
                g = config.car.gearRatios.g2;
                break;
            case 3:
                g = config.car.gearRatios.g3;
                break;
            case 4:
                g = config.car.gearRatios.g4;
                break;
            case 5:
                g = config.car.gearRatios.g5;
                break;
            case 6:
                g = config.car.gearRatios.g6;
                break;
            case -1:
                g = config.car.gearRatios.gR;
                break;
            default:
                g = 0;
                break;
        }
        return g * G;
    }
    var automaticTransmission = function() {
        //limit at max speed
        if (car.state.gear < 6) {
            if (car.state.velocity > car.getMaxVelocityForCurrentGear()) {
                car.state.gear++
            }
        }
        //limit at inferior speeds
        if (car.state.gear > 1) {
            car.state.gear--
            if (car.state.velocity > car.getMaxVelocityForCurrentGear() /*+ car.config.histDeltaVelocity*/) {
                car.state.gear++
            }
        }
    }
    var computeRpm = function() {
        var gearRatio = car.getTotalGearRatio();
        car.state.rpm = car.getSpeedMps() * gearRatio * 60 / (2 * Math.PI * config.car.wheelRadius);
        if (car.state.rpm < 1000) {
            car.state.rpm = 1000;
        } else if (car.state.rpm > 7000) {
            car.state.rpm = 7000;
            //limit velocity
            car.state.velocity = 20 * 2 * Math.PI * config.car.wheelRadius * 7000 / (60 * gearRatio)
        }
    }


    car.setVelocity = function(level) {
      // Gas pedal or brake pedal?
      var pedalLevel = (level >= 0) ? config.car.pedalLevels[level] : config.car.brake

      car.state.velocity += car.state.acceleration
      automaticTransmission()
      computeRpm()
      car.state.traction = powertrain.getTraction(car, pedalLevel)
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

    car.getSpeedMps = function () {
        return car.p.body.speed / 20
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