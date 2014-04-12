'use strict'

angular.module('hejwel')

.directive('hejwelWorld',
  function(car, ground) {
    return {
      restrict: 'AE',
      link: function($scope, $element) {
        var game
        var hejwelWorldDomElement = $element[0]
        var gameObjects = [ground, car]

        game = new Phaser.Game(
          window.innerWidth,
          window.innerHeight,
          Phaser.AUTO,
          hejwelWorldDomElement,
          {
            preload: function() {
              _.each(gameObjects, function(gameObject) {
                gameObject.setup(game)
              })
            },

            create: function() {
              _.each(gameObjects, function(gameObject) {
                gameObject.create()
              })
            },

            update: function() {
              car.update()
            }
          }
        )
      }
    }
  }
)