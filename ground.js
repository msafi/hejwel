'use strict';

angular.module('hejwel')

.service('ground',
  function() {
    var ground = {}
    var game

    ground.setup = function(game_) {
      game = game_
      game.load.image('asphalt', 'assets/asphalt3.jpg')
    }

    ground.create = function() {
      ground.p = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'asphalt')
    }

    ground.update = angular.noop

    return ground
})