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

        firstGearForceLevel: 0.1,

      gearRatios: { g1 : 2.66, g2 : 1.78, g3 : 1.30, g4 : 1.0, g5 : 0.74, g6 : 0.50, gR : 2.90, dR : 3.42 },

      wheelRadius : 0.3,

      switchRpm : 5000,

      histDeltaVelocity : 10 * 20 / 3.6,

      mass : 1500,

      brake: -1,

      gearStick: { forward: 1, reverse: -1 }, // Direction

      maxSpeed: 1000,

      minSpeed: 10,

      dragCoeff: 0.00000004,

      rollCoeff: 0.0005,
      
      frictionCoefficient: 0.8
    }
  }
)