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
  car.velocity.maxModule = 0;
  
  car.acceleration = {}
  car.acceleration.module = 0
  car.acceleration.x = 0
  car.acceleration.y = 0
  
  car.orientation = {}
  car.orientation.angle = 0 // No rotation
  car.orientation.projection = {}
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
  
  car.f.setMaxSpeed = function(newSpeed) {
  	car.velocity.maxModule = newSpeed;
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
  	var newVelocity = car.velocity.module + car.acceleration.module;
  	if (newVelocity < 0) {
  		newVelocity = 0
  	} else if (newVelocity > car.velocity.maxModule) {
  		newVelocity = car.velocity.maxModule
  	}
  	car.f.setVelocity(newVelocity)

  	if (car.state.gearStick == config.car.gearStick.drive) {
  	    car.kineticJs.move({ x : car.velocity.x, y : car.velocity.y })
  	}
  }

  car.f.steer = function() {
    var rotationAngle = car.state.steering
    car.kineticJs.rotate(rotationAngle)
   	car.f.setAngle(car.orientation.angle + rotationAngle)
   	car.f.setVelocity(car.velocity.module)
  }

  function inputSwitcher(keyCode, keyState) {

    switch (keyCode) {
      case config.kc.A:
        car.f.setAcceleration((keyState) ? config.car.accelerations.normal : config.car.accelerations.free)
        car.f.setMaxSpeed(config.car.speeds.one)
        break
      case config.kc.S:
        car.f.setAcceleration((keyState) ? config.car.accelerations.normal : config.car.accelerations.free)
        car.f.setMaxSpeed(config.car.speeds.two)
        break
      case config.kc.D:
        car.f.setAcceleration((keyState) ? config.car.accelerations.normal : config.car.accelerations.free)
        car.f.setMaxSpeed(config.car.speeds.three)
        break
      case config.kc.F:
        car.f.setAcceleration((keyState) ? config.car.accelerations.normal : config.car.accelerations.free)
        car.f.setMaxSpeed(config.car.speeds.four)
        break
      case config.kc.C:
      	car.f.setAcceleration((keyState) ? config.car.accelerations.braking : config.car.accelerations.free)
      	break	
      case config.kc.K:
        car.state.steering = (keyState) ? config.car.steering.left : config.car.steering.straight
        break
      case config.kc.L:
        car.state.steering = (keyState) ? config.car.steering.right : config.car.steering.straight
        break
      case config.kc.J:
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
        car.state.steering !== config.car.steering.straight,
        car.velocity.module > 0
    ]

    car.f.move()

    if (_.all(steeringConditions)) {
      car.f.steer()
    }

  }

  return car
})