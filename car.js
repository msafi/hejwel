'use strict';

angular.module('hejwel')

.service('car',
  function(config) {
    var game
    var controls

    var car = {}
    car.p = {}

    function setInitialState() {
      // Car initial state
      car.state = {}

      car.p.body.velocity.x = config.car.speeds.zero
      car.p.body.velocity.y = config.car.speeds.zero
      car.p.body.angularVelocity = config.car.speeds.zero
    }

    car.setup = function(game_) {
      game = game_
      game.load.image('car', 'assets/car.png')
    }

    car.create = function() {
      car.p = game.add.sprite(200, 200, 'car')
      game.physics.enable(car.p)
      controls = game.input.keyboard.createCursorKeys()
      car.p.anchor.setTo(0.2, 0.5);
      car.p.scale.setTo(0.45)

      setInitialState()
    }

    car.update = function() {
      setInitialState()

      if (controls.up.isDown) {
        car.p.body.velocity.x = 700 * Math.cos(car.p.rotation)
        car.p.body.velocity.y = 700 * Math.sin(car.p.rotation)

        if (controls.left.isDown) {
          car.p.body.angularVelocity = -200
        }
        else if (controls.right.isDown) {
          car.p.body.angularVelocity = 200
        }
      }
    }

    return car
})








//    car.state = {}
//    car.state.steering = config.car.steering.straight
//    car.state.gearStick = config.car.gearStick.drive
//
//    car.state.velocity = {}
//    car.state.velocity.x = config.car.speeds.zero
//    car.state.velocity.y = config.car.speeds.zero
//
//    car.state.speed = config.car.speeds.zero
//    car.state.angle = 0 // No rotation
//
//    var carHeight = 15
//    var carWidth = carHeight * 2
//
//    car.calculateVelocity = function() {
//      car.state.velocity.x = car.state.speed * Math.cos(car.state.angle * Math.PI / 180)
//      car.state.velocity.y = car.state.speed * Math.sin(car.state.angle * Math.PI / 180)
//    }
//
//    car.move = {}
//    car.move.forward = function() {
//      car.calculateVelocity()
//
//      car.kineticJs.move(car.state.velocity)
//    }
//
//    car.move.back = function() {
////    car.kineticJs.move({ x: -1 })
//    }
//
//    car.steer = {}
//    car.steer.left = function() {
//      var rotationAngle = car.state.steering
//
//      car.kineticJs.rotate(rotationAngle)
//
//      car.state.angle = car.state.angle + rotationAngle
//
//      car.calculateVelocity()
//    }
//
//    car.steer.right = function() {
//      var rotationAngle = car.state.steering
//
//      car.kineticJs.rotate(rotationAngle)
//
//      car.state.angle = car.state.angle + rotationAngle
//
//      car.calculateVelocity()
//    }
//
//    function inputSwitcher(keyCode, keyState) {
//      switch (keyCode) {
//        case config.kc.arrows.up:
//          car.state.gearStick = config.car.gearStick.drive
//          car.state.speed = (keyState) ? config.car.speeds.four : config.car.speeds.zero
//          break
//        case config.kc.arrows.down:
//          car.state.gearStick = config.car.gearStick.reverse
//          car.state.speed = (keyState) ? config.car.speeds.four : config.car.speeds.zero
//          break
//        case config.kc.arrows.left:
//          car.state.steering = (keyState) ? config.car.steering.left : config.car.steering.straight
//          break
//        case config.kc.arrows.right:
//          car.state.steering = (keyState) ? config.car.steering.right : config.car.steering.straight
//          break
//      }
//    }
//
//    car.update = function(frame) {
//      if (controls.left.isDown) {
////        car.phaser.body.rotateLeft(100);
//      }
//      else if (controls.right.isDown) {
////        car.phaser.body.rotateRight(100);
//      }
//      else {
////        car.phaser.body.setZeroRotation();
//      }
//
//      if (controls.up.isDown) {
//        console.log(car.phaser.body)
////        car.phaser.body.thrust(400);
//      }
//      else if (controls.down.isDown) {
////        car.phaser.body.reverse(400);
//      }
//
//      var moveForwardConditions = [
//          car.state.speed > config.car.speeds.zero,
//          car.state.gearStick === config.car.gearStick.drive
//      ]
//
//      var moveBackConditions = [
//          car.state.speed > config.car.speeds.zero,
//          car.state.gearStick === config.car.gearStick.reverse
//      ]
//
//      var steeringLeftConditions = [
//          car.state.steering === config.car.steering.left
//      ]
//
//      var steeringRightConditions = [
//          car.state.steering === config.car.steering.right
//      ]
//
//      if (_.all(moveForwardConditions)) {
//        car.move.forward()
//      }
//
//      if (_.all(moveBackConditions)) {
//        car.move.back()
//      }
//
//      if (_.all(steeringLeftConditions)) {
//        car.steer.left()
//      }
//
//      if (_.all(steeringRightConditions)) {
//        car.steer.right()
//      }
//    }
//
//    return car