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
      var seventyPercentTheWidth = Math.round((game.world.width * 0.7))
      var thirtyPercentTheWidth = Math.round(game.world.width * 0.3)
      var seventyPercentTheHeight = Math.round(game.world.height * 0.7)
      var thirtyPercentTheHeight = Math.round(game.world.height * 0.3)

      if (car.p.body.speed > 0) {
        if (car.p.body.position.x > seventyPercentTheWidth) {
          ground.p.tilePosition.x -= car.p.body.velocity.x * game.time.physicsElapsed
          car.p.body.position.x = seventyPercentTheWidth
        }

        if (car.p.body.position.x < thirtyPercentTheWidth) {
          ground.p.tilePosition.x -= car.p.body.velocity.x * game.time.physicsElapsed
          car.p.body.position.x = thirtyPercentTheWidth
        }

        if (car.p.body.position.y > seventyPercentTheHeight) {
          ground.p.tilePosition.y -= car.p.body.velocity.y * game.time.physicsElapsed
          car.p.body.position.y = seventyPercentTheHeight
        }

        if (car.p.body.position.y < thirtyPercentTheHeight) {
          ground.p.tilePosition.y -= car.p.body.velocity.y * game.time.physicsElapsed
          car.p.body.position.y = thirtyPercentTheHeight
        }
      }
    }

    return camera
  })