'use strict';

angular.module('hejwel')

.service('camera',
  function(car, ground) {
    var camera = {}
    var game

    camera.setup = function(game_) {
      game = game_
    }

    camera.create = angular.noop

    camera.update = function() {
      var seventyPercentTheWidth = game.world.width * 0.7
      var thirtyPercentTheWidth = game.world.width * 0.3
      var seventyPercentTheHeight = game.world.height * 0.7
      var thirtyPercentTheHeight = game.world.height * 0.3

      if (car.p.body.speed > 0) {
        if (car.p.x > seventyPercentTheWidth) {
          ground.p.tilePosition.x -= car.p.x - seventyPercentTheWidth
          car.p.x = seventyPercentTheWidth
        }

        if (car.p.x < thirtyPercentTheWidth) {
          ground.p.tilePosition.x -= car.p.x - thirtyPercentTheWidth
          car.p.x = thirtyPercentTheWidth
        }

        if (car.p.y > seventyPercentTheHeight) {
          ground.p.tilePosition.y -= car.p.y - seventyPercentTheHeight
          car.p.y = seventyPercentTheHeight
        }

        if (car.p.y < thirtyPercentTheHeight) {
          ground.p.tilePosition.y -= car.p.y - thirtyPercentTheHeight
          car.p.y = thirtyPercentTheHeight
        }
      }
    }

    return camera
  })