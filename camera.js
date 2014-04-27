'use strict';

angular.module('hejwel')

.service('camera',
  function(car, ground, config) {
    var camera = {}
    var game

    camera.setup = function(game_) {
      game = game_
    }

    camera.create = function() {
      game.camera.focusOnXY(450000, 450000)
    }

    camera.update = function() {
      var currentSpeed = car.p.body.speed

      function cameraDistance() {
        var maxSpeed = config.car.maxSpeed
        var speedPercentage = currentSpeed / maxSpeed
        var halfScreenWidth = window.innerWidth / 2
        var halfScreenHeight = window.innerHeight / 2

        var useHeight = (halfScreenHeight < halfScreenWidth) ? true : false

        if (useHeight) {
          return halfScreenHeight * speedPercentage
        } else {
          return halfScreenWidth * speedPercentage
        }
      }

      if (currentSpeed > 0) {
        ground.p.tilePosition.x -= Math.round(car.p.body.velocity.x * game.time.physicsElapsed)
        ground.p.tilePosition.y -= Math.round(car.p.body.velocity.y * game.time.physicsElapsed)

        game.camera.focusOnXY(
          Math.round(cameraDistance() * Math.cos(game.math.degToRad(car.p.angle)) + car.p.body.position.x),
          Math.round(cameraDistance() * Math.sin(game.math.degToRad(car.p.angle)) + car.p.body.position.y)
        )
      }
    }

//    camera.update = angular.noop

    return camera
  })