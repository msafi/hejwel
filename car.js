function car() {
  var car = {} // Object that will be manufactured and returned by this function

  // Car vector
  car.vector = {}
  car.vector.x = 1
  car.vector.y = 0

  car.kineticJs = new Kinetic.Rect()

  var carHeight = 9
  var carWidth = carHeight * 2

  car.kineticJs.setHeight(carHeight)
  car.kineticJs.setWidth(carWidth)
  car.kineticJs.fill('6EA9C6')
  car.kineticJs.setAbsolutePosition({ x: 20, y: (window.innerHeight - carHeight) / 2 })
  car.kineticJs.offsetX(carWidth / 2)
  car.kineticJs.offsetY(carHeight / 2)

  car.move = {}
  car.move.forward = function() {
    car.kineticJs.move(car.vector)
  }

  car.move.back = function() {
//    car.kineticJs.move({ x: -1 })
  }

  car.steer = {}
  car.steer.left = function() {
    car.vector.x = Math.sin(5 * (Math.PI / -180))
    car.vector.y = Math.cos(5 * (Math.PI / -180))

    console.log(car.vector)

    car.kineticJs.rotate(-5)
  }

  car.steer.right = function() {
    console.log(car.kineticJs.rotation())
    car.kineticJs.rotate(5)
  }

  car.state = {}
  car.state.speed = config.car.speeds.zero
  car.state.steering = config.car.steering.straight
  car.state.gearStick = config.car.gearStick.drive

  function inputSwitcher(keyCode, keyState) {
    switch (keyCode) {
      case config.kc.arrows.up:
        car.state.gearStick = config.car.gearStick.drive
        car.state.speed = (keyState) ? config.car.speeds.one : config.car.speeds.zero
        break
      case config.kc.arrows.down:
        car.state.gearStick = config.car.gearStick.reverse
        car.state.speed = (keyState) ? config.car.speeds.one : config.car.speeds.zero
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

  return car
}