'use strict'

angular.module('hejwel')

.service('car',
  function(config) {
    var car = {} // Object that will be manufactured and returned by this function

    car.state = {}
    car.state.steering = config.car.steering.straight
    car.state.gearStick = config.car.gearStick.drive

    car.state.velocity = {}
    car.state.velocity.x = config.car.speeds.zero
    car.state.velocity.y = config.car.speeds.zero

    car.state.speed = config.car.speeds.zero
    car.state.angle = 0 // No rotation

    car.kineticJs = new Kinetic.Rect()

    var carHeight = 15
    var carWidth = carHeight * 2

    car.kineticJs.setHeight(carHeight)
    car.kineticJs.setWidth(carWidth)
    car.kineticJs.fill('6EA9C6')
    car.kineticJs.setAbsolutePosition({ x: 20, y: (window.innerHeight - carHeight) / 2 })
    car.kineticJs.offsetX(carWidth / 2)
    car.kineticJs.offsetY(carHeight / 2)

    car.calculateVelocity = function() {
      car.state.velocity.x = car.state.speed * Math.cos(car.state.angle * Math.PI / 180)
      car.state.velocity.y = car.state.speed * Math.sin(car.state.angle * Math.PI / 180)
    }

    car.move = {}
    car.move.forward = function() {
      car.calculateVelocity()

      car.kineticJs.move(car.state.velocity)
    }

    car.move.back = function() {
//    car.kineticJs.move({ x: -1 })
    }

    car.steer = {}
    car.steer.left = function() {
      var rotationAngle = car.state.steering

      car.kineticJs.rotate(rotationAngle)

      car.state.angle = car.state.angle + rotationAngle

      car.calculateVelocity()
    }

    car.steer.right = function() {
      var rotationAngle = car.state.steering

      car.kineticJs.rotate(rotationAngle)

      car.state.angle = car.state.angle + rotationAngle

      car.calculateVelocity()
    }

    function inputSwitcher(keyCode, keyState) {
      switch (keyCode) {
        case config.kc.arrows.up:
          car.state.gearStick = config.car.gearStick.drive
          car.state.speed = (keyState) ? config.car.speeds.four : config.car.speeds.zero
          break
        case config.kc.arrows.down:
          car.state.gearStick = config.car.gearStick.reverse
          car.state.speed = (keyState) ? config.car.speeds.four : config.car.speeds.zero
          break
        case config.kc.arrows.left:
          car.state.steering = (keyState) ? config.car.steering.left : config.car.steering.straight
          break
        case config.kc.arrows.right:
          car.state.steering = (keyState) ? config.car.steering.right : config.car.steering.straight
          break
      }
    }

    document.addEventListener('keydown', function(event) {
      inputSwitcher(event.keyCode, 1)
    })

    document.addEventListener('keyup', function(event) {
      inputSwitcher(event.keyCode, 0)
    })

    car.update = function(frame) {
      var moveForwardConditions = [
          car.state.speed > config.car.speeds.zero,
          car.state.gearStick === config.car.gearStick.drive
      ]

      var moveBackConditions = [
          car.state.speed > config.car.speeds.zero,
          car.state.gearStick === config.car.gearStick.reverse
      ]

      var steeringLeftConditions = [
          car.state.steering === config.car.steering.left
      ]

      var steeringRightConditions = [
          car.state.steering === config.car.steering.right
      ]

      if (_.all(moveForwardConditions)) {
        car.move.forward()
      }

      if (_.all(moveBackConditions)) {
        car.move.back()
      }

      if (_.all(steeringLeftConditions)) {
        car.steer.left()
      }

      if (_.all(steeringRightConditions)) {
        car.steer.right()
      }
    }

    return car
  }
)
