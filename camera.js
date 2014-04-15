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

    camera.render = function() {
      var seventyPercentTheWidth = Math.round(game.world.width * 0.7)
      var thirtyPercentTheWidth = Math.round(game.world.width * 0.3)
      var seventyPercentTheHeight = Math.round(game.world.height * 0.7)
      var thirtyPercentTheHeight = Math.round(game.world.height * 0.3)

      if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
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