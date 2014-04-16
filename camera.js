'use strict';

angular.module('hejwel')

.service('camera',
  function(car, ground) {
    var camera = {}
    var game

    camera.setup = function(game_) {
      game = game_
    }

    camera.create = function() {
      game.camera.follow(car.p, Phaser.Camera.FOLLOW_TOPDOWN);
    }

    return camera
  })