'use strict'

angular.module('hejwel')

.directive('hejwelWorld',
  function(car) {
    return {
      restrict: 'E',
      link: function($scope, $element, $attributes) {
        var world = new Kinetic.Stage({ container: $element[0] })
        var ground = new Kinetic.Layer()
        var asphalt = new Kinetic.Rect()

        var imageObj = new Image();
        imageObj.onload = function() {
          asphalt.fillPatternImage(imageObj);
        };
        imageObj.src = 'asphalt.jpg';

        // Add stuff into each other
        ground.add(asphalt)
        ground.add(car.kineticJs)
        world.add(ground)

        // Animate
        var animation = new Kinetic.Animation(function(frame) {
          // Configure stage
          world.setWidth(window.innerWidth)
          world.setHeight(window.innerHeight)
          asphalt.setHeight(world.getHeight())
          asphalt.setWidth(world.getWidth())

          car.update(frame)
        }, ground)

        animation.start()
      }
    }
  }
)