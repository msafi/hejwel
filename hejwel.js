document.addEventListener('DOMContentLoaded', function() {
  var world = new Kinetic.Stage({ container: document.body })
  var ground = new Kinetic.Layer()
  var asphalt = new Kinetic.Rect()

  var imageObj = new Image();
  imageObj.onload = function() {
    asphalt.fillPatternImage(imageObj);
  };
  imageObj.src = 'asphalt.jpg';

  var defaultCar = car()

  // Add stuff into each other
  ground.add(asphalt)
  ground.add(defaultCar.kineticJs)
  world.add(ground)

  // Animate
  var animation = new Kinetic.Animation(function(frame) {
    // Configure stage
    world.setWidth(window.innerWidth)
    world.setHeight(window.innerHeight)
    asphalt.setHeight(world.getHeight())
    asphalt.setWidth(world.getWidth())

    defaultCar.update(frame)
  }, ground)

  animation.start()
})