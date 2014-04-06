var config = {}

config.car = {}
config.car.steering = { sharpLeft: -10, left: -5, straight: 0, right: 5, sharpRight: 10 } // Degrees
config.car.speeds = { zero: 0, one: 1, two: 2, three: 4, four: 6 } // Pixels?
config.car.gearStick = { drive: 1, reverse: -1, neutral: 0 } // Direction?

config.kc = {}
config.kc.arrows = {}
config.kc.arrows.up = 38
config.kc.arrows.down = 40
config.kc.arrows.left = 37
config.kc.arrows.right = 39