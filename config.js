'use strict'

angular.module('hejwel')

.constant('config',
  {
    car: {
      steering: { sharpLeft: -10, left: -5, straight: 0, right: 5, sharpRight: 10 }, // Degrees
      accelerations: { zero: 0, one: 0.25, two: 0.5, three: 0.75, four: 1, braking: -0.5 }, // Throttle position
      gearStick: { forward: 1, reverse: -1 }, // Direction
      maxSpeed: 20,
      minSpeed: 0.1,
      dragCoeff: 0.003,
      rollCoeff: 0.005
    },

    kc: {
      arrows: {
        up: 38,
        down: 40,
        left: 37,
        right: 39
      },
      A : 65,
      S : 83,
      D : 68,
      F : 70,
      J : 74,
      K : 75,
      L : 76,
      C : 67,
      semicolon : 186
    }
  }
)