'use strict'

angular.module('hejwel')

    .constant('config',
    {
        car: {
            angularMaxVelocities: { sharpLeft: -80 * Math.PI/180,
                                    left: -35 * Math.PI/180,
                                    right: 35 * Math.PI/180,
                                    sharpRight: 80 * Math.PI/180},
            angularAccelerations: { sharpLeft: -20 * Math.PI/180,
                                    left: -10 * Math.PI/180,
                                    straight: 0 * Math.PI/180,
                                    right: 10 * Math.PI/180,
                                    sharpRight: 20 * Math.PI/180 }, // Degrees
            angularReset: 1 * Math.PI/180,
            accelerations: { zero: 0, one: 0.25, two: 0.5, three: 0.75, four: 1, braking: -0.8 }, // Throttle position
            gearStick: { forward: 1, reverse: -1 }, // Direction
            maxSpeed: 1500,
            minSpeed: 1,
            dragCoeff: 0.000003,
            rollCoeff: 0.00005
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