'use strict';

angular.module('hejwel')

.service('powertrain',
  function(config) {
    var powertrain = {}

    var maxTraction = 4

    powertrain.getTraction = function(powerPercentage) {
      return powerPercentage * maxTraction
    }

    return powertrain
  }
)