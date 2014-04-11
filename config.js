'use strict'

angular.module('hejwel')

.constant('config',
  {
    car: {
      steering: { sharpLeft: -10, left: -5, straight: 0, right: 5, sharpRight: 10 }, // Degrees
      speeds: { zero: 0, one: 2, two: 4, three: 6, four: 8 }, // Pixels?
      gearStick: { drive: 1, reverse: -1, neutral: 0 }, // Direction?
      accelerations: { zero: 0, free : -0.02, normal: 0.3, braking : -0.2 }
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