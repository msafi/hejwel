'use strict'

angular.module('hejwel')

.service('car',
  function(config) {
  var car = {} // Object that will be manufactured and returned by this function
  

  car.state = {}
  car.state.steering = config.car.steering.straight
  car.state.gearStick = config.car.gearStick.forward

  car.velocity = {}
  car.velocity.module = 0
  car.velocity.x = 0
  car.velocity.y = 0
  
  car.acceleration = {}
  car.acceleration.module = 0
  car.acceleration.traction = 0
  car.acceleration.maxTraction = config.car.rollCoeff * config.car.maxSpeed +
                               config.car.dragCoeff * config.car.maxSpeed * config.car.maxSpeed;
  //car.acceleration.x = 0
  //car.acceleration.y = 0
  
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
    if (newModule < config.car.minSpeed) {
        newModule = 0;
    }
  	car.velocity.module = newModule
  	car.velocity.x = newModule * car.orientation.projection.x
  	car.velocity.y = newModule * car.orientation.projection.y
  }
  
  car.f.setTraction = function(percent) {
      car.acceleration.traction = percent * car.acceleration.maxTraction
  }

  car.f.updateAcceleration = function() {
      var dragForce = config.car.dragCoeff * car.velocity.module * car.velocity.module
      var rollForce = config.car.rollCoeff * car.velocity.module
      car.acceleration.module = car.acceleration.traction - dragForce - rollForce
  	  //car.acceleration.x = newModule * car.orientation.projection.x
  	  //car.acceleration.y = newModule * car.orientation.projection.y
  }
  
  //initialisation
  car.f.setAngle(0)
  car.f.setVelocity(0)
  car.f.setTraction(config.car.accelerations.zero)

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
 	car.kineticJs.move({ x : car.velocity.x, y : car.velocity.y })
    car.f.setVelocity(car.velocity.module + car.acceleration.module)
    car.f.updateAcceleration()
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
        car.f.setTraction((keyState) ? config.car.accelerations.one : config.car.accelerations.zero)
        break
      case config.kc.S:
        car.f.setTraction((keyState) ? config.car.accelerations.two : config.car.accelerations.zero)
        break
      case config.kc.D:
        car.f.setTraction((keyState) ? config.car.accelerations.three : config.car.accelerations.zero)
        break
      case config.kc.F:
        car.f.setTraction((keyState) ? config.car.accelerations.four : config.car.accelerations.zero)
        break
      case config.kc.C:
      	car.f.setTraction((keyState) ? config.car.accelerations.braking : config.car.accelerations.zero)
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