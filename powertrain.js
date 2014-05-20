'use strict';

angular.module('hejwel')

.service('powertrain',
  function(config) {
    var car

    return {
      rpm: 0,

      gear: 1,

      gearRatios: { 1: 2.66, 2: 1.78, 3: 1.30, 4: 1.0, 5: 0.74, 6: 0.50, gR: 2.90, dR: 3.42 },

      switchRpm: 5000,

      firstGearForceLevel: 0.1,

      install: function(newCar) {
        car = newCar
      },

      getTraction: function(powerPercentage) {
        var maxTraction
          = this.gearRatios.dR
          * this.gearRatios[this.gear]
          * getTorque(this.rpm)
          / car.wheelRadius
          / car.mass

        if (powerPercentage == 0 && this.rpm == 1000) {
          return this.firstGearForceLevel * maxTraction
        } else {
          return powerPercentage * maxTraction
        }
      },

      getGearMaxVelocity: function(gear) {
        if (gear === undefined)
          gear = this.gear

        return 20 * 2 * Math.PI * car.wheelRadius * this.switchRpm / (60 * this.gearRatios.dR * this.gearRatios[gear])
      },

      automaticTransmission: function() {
        //limit at max speed
        if (this.gear < 6) {
          if (car.state.velocity > this.getGearMaxVelocity()) {
            this.gear++
          }
        }
        //limit at inferior speeds
        if (this.gear > 1) {
          this.gear--
          if (car.state.velocity > this.getGearMaxVelocity()) {
            this.gear++
          }
        }

        // Compute RPM
        var gearRatio = this.gearRatios.dR * this.gearRatios[this.gear];

        this.rpm = car.getSpeedMps() * gearRatio * 60 / (2 * Math.PI * car.wheelRadius);

        if (this.rpm < 1000) {
          this.rpm = 1000;
        } else if (this.rpm > 7000) {
          this.rpm = 7000;
          //limit velocity
          car.state.velocity = 20 * 2 * Math.PI * car.wheelRadius * 7000 / (60 * gearRatio)
        }
      }
    }

    function getTorque(rpm) {
      if (rpm <= 1000) {
        return 220
      } else if (rpm <= 4500) {
        return rpm * 9.0 / 350 + 174.3
      } else {
        return 326.2 - rpm * 9.0 / 250
      }
    }
  }
)