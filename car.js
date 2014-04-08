'use strict'

angular.module('hejwel')

.service('car',
  function(config) {
  var car = {} // Object that will be manufactured and returned by this function
  

  car.state = {}
  car.state.steering = config.car.steering.straight
  car.state.gearStick = config.car.gearStick.drive

  car.velocity = {}
  car.velocity.module = 0
  car.velocity.x = 0
  car.velocity.y = 0
  
  car.acceleration = {}
  car.acceleration.module = 0
  car.acceleration.x = 0
  car.acceleration.y = 0
  
  car.orientation = {}
  car.orientation.angle = 0 // No rotation
  car.orientation.projection.x = 1
  car.orientation.projection.y = 0
  
  car.f = {}
  
  car.f.setAngle = function(newAngle) {
  	car.orientation.angle = newAngle
  	car.orientation.projection.x = Math.cos(newAngle * Math.PI / 180)
  	car.orientation.projection.y = Math.sin(newAngle * Math.PI / 180)
  }
  
  car.f.setVelocity = function(newModule) {
  	car.velocity.module = newModule
  	car.velocity.x = newModule * car.orientation.projection.x
  	car.velocity.y = newModule * car.orientation.projection.y
  }
  
  car.f.setAcceleration = function(newModule) {
  	car.acceleration.module = newModule
  	car.acceleration.x = newModule * car.orientation.projection.x
  	car.acceleration.y = newModule * car.orientation.projection.y
  }

  
  //initialisation
  car.f.setAngle(0)
  car.f.setVelocity(0)
  car.f.setAcceleration(0)

  car.kineticJs = new Kinetic.Rect()

  var carHeight = 9
  var carWidth = carHeight * 2

  car.kineticJs.setHeight(carHeight)
  car.kineticJs.setWidth(carWidth)
  car.kineticJs.fill('6EA9C6')
  car.kineticJs.setAbsolutePosition({ x: 20, y: (window.innerHeight - carHeight) / 2 })
  car.kineticJs.offsetX(carWidth / 2)
  car.kineticJs.offsetY(carHeight / 2)

  car.f.move = function() {
  	if (car.state.gearStick === config.car.gearStick.drive) {
  	    car.kineticJs.move(car.velocity.x, car.velocity.y)
  	}
  }

  car.f.steer = function() {
    var rotationAngle = car.state.steering
    car.kineticJs.rotate(rotationAngle)
   	car.f.setAngle(car.orientation.angle + rotationAngle)
  }

  function inputSwitcher(keyCode, keyState) {

    switch (keyCode) {
      case config.kc.keyA:
        car.state.gearStick = config.car.gearStick.drive
        car.f.setVelocity((keyState) ? config.car.speeds.one : config.car.speeds.zero)
        break
      case config.kc.keyS:
        car.state.gearStick = config.car.gearStick.drive
        car.f.setVelocity((keyState) ? config.car.speeds.two : config.car.speeds.zero)
        break
      case config.kc.keyD:
        car.state.gearStick = config.car.gearStick.drive
        car.f.setVelocity((keyState) ? config.car.speeds.three : config.car.speeds.zero)
        break
      case config.kc.keyF:
        car.state.gearStick = config.car.gearStick.drive
        car.f.setVelocity((keyState) ? config.car.speeds.four : config.car.speeds.zero)
        break
      case config.kc.keyK:
        car.state.steering = (keyState) ? config.car.steering.left : config.car.steering.straight
        break
      case config.kc.keyL:
        car.state.steering = (keyState) ? config.car.steering.right : config.car.steering.straight
        break
      case config.kc.keyJ:
        car.state.steering = (keyState) ? config.car.steering.sharpLeft : config.car.steering.straight
        break
      case config.kc.semicolon:
        car.state.steering = (keyState) ? config.car.steering.sharpRight : config.car.steering.straight
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

    var steeringConditions = [
        car.state.steering !== config.car.steering.straight
    ]

    car.move()

    if (_.all(steeringConditions)) {
      car.steer()
    }

  }

  return car
})