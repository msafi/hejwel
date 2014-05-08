'use strict';

angular.module('hejwel')

.service('powertrain',
  function(config) {
    var powertrain = {}

      var getTorque = function(rpm) {
          if (rpm <= 1000) {
              return 220
          } else if (rpm <= 4500) {
              return rpm * 9.0 / 350 + 174.3
          } else {
              return 326.2 - rpm * 9.0 / 250
          }
      }


    powertrain.getTraction = function(car, powerPercentage) {
        var maxTraction = car.getTotalGearRatio() * getTorque(car.state.rpm) / config.car.wheelRadius / config.car.mass
        if (powerPercentage == 0 && car.state.rpm == 1000) {
            return config.car.firstGearForceLevel * maxTraction
        } else {
            return powerPercentage * maxTraction
        }
    }

    return powertrain
  }
)