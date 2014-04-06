document.addEventListener('DOMContentLoaded', function() {
  var stage = new Kinetic.Stage({ container: document.body })
  var layer = new Kinetic.Layer()
  var defaultCar = car()

  // Configure stage
  stage.setWidth(window.innerWidth)
  stage.setHeight(window.innerHeight)

  // Add stuff into each other
  layer.add(defaultCar.kineticJs)
  stage.add(layer)

  // Animate
  var animation = new Kinetic.Animation(function(frame) {
    var moveForwardConditions = [
      defaultCar.state.speed === config.car.speeds.one,
      defaultCar.state.gearStick === config.car.gearStick.drive
    ]

    var moveBackConditions = [
      defaultCar.state.speed === config.car.speeds.one,
      defaultCar.state.gearStick === config.car.gearStick.reverse
    ]

    var steeringLeftConditions = [
      defaultCar.state.steering === config.car.steering.left
    ]

    var steeringRightConditions = [
      defaultCar.state.steering === config.car.steering.right
    ]

    if (_.all(moveForwardConditions)) {
      defaultCar.move.forward()
    }

    if (_.all(moveBackConditions)) {
      defaultCar.move.back()
    }

    if (_.all(steeringLeftConditions)) {
      defaultCar.steer.left()
    }

    if (_.all(steeringRightConditions)) {
      defaultCar.steer.right()
    }
  }, layer)

  animation.start()
})