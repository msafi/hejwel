'use strict';

angular.module('hejwel')

.service('powertrain',
  function(config) {
    var powertrain = {}

    var maxTraction = config.car.rollCoeff
                    * config.car.maxSpeed
                    + config.car.dragCoeff
                    * config.car.maxSpeed
                    * config.car.maxSpeed

    powertrain.getTraction = function(powerPercentage) {
      return powerPercentage * maxTraction
    }

    return powertrain
  }
)