'use strict';

angular.module('hejwel')

.service('drivingEnvironment',
  function(config) {
    var drivingEnvironment = {}

    drivingEnvironment.getPossibleAcceleration = function(carState) {
      var fDrag = config.car.dragCoeff * Math.pow(carState.velocity, 2)
      var fRollingResistance = config.car.rollCoeff * carState.velocity

      return carState.traction - fDrag - fRollingResistance
    }

    return drivingEnvironment
  }
)