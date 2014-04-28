'use strict'

angular.module('hejwel')

.constant('config',
  {
    car: {
      angularMaxVelocities: {
        sharpLeft: -80 * Math.PI / 180,
        left: -35 * Math.PI / 180,
        right: 35 * Math.PI / 180,
        sharpRight: 80 * Math.PI / 180
      },

      angularAccelerations: {
        sharpLeft: -20 * Math.PI / 180,
        left: -10 * Math.PI / 180,
        straight: 0 * Math.PI / 180,
        right: 10 * Math.PI / 180,
        sharpRight: 20 * Math.PI / 180
      }, // Degrees

      angularReset: 1 * Math.PI / 180,

      pedalLevels: { 0: 0, 1: 0.25, 2: 0.5, 3: 0.75, 4: 1 }, // Throttle position

      brake: -1,

      gearStick: { forward: 1, reverse: -1 }, // Direction

      maxSpeed: 1000,

      minSpeed: 1,

      dragCoeff: 0.000003,

      rollCoeff: 0.00005
    },
  }
)