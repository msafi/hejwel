'use strict'

angular.module('hejwel')

.constant('config',
  {
    car: {
      steering: { sharpLeft: -10, left: -5, straight: 0, right: 5, sharpRight: 10 }, // Degrees
      speeds: { zero: 0, one: 2, two: 4, three: 6, four: 8 }, // Pixels?
      gearStick: { drive: 1, reverse: -1, neutral: 0 }, // Direction?
      accelerations: { zero: 0, free : -0.05, normal: 0.3, braking : -1 }
    },

    kc: {
      arrows: {
        up: 38,
        down: 40,
        left: 37,
        right: 39
      },
      keyA : 65,
      keyS : 83,
      keyD : 68,
      keyF : 70,
      keyJ : 74,
      keyK : 75,
      keyL : 76,
      semicolon : 186
    }
  }
)