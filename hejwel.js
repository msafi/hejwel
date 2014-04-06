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
    defaultCar.update(frame)
  }, layer)

  animation.start()
})