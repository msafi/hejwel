'use strict';

angular.module('hejwel')

.service('car',
  function(config, powertrain, drivingEnvironment) {
    var game = {}

    return {
      powertrain: powertrain,

      pedalLevels: { 0: 0, 1: 0.25, 2: 0.5, 3: 0.75, 4: 1 },

      steeringLevels: { none: 0, normal: 20, sharp: 40 },

      steeringDirections: { none: 0, left: 1, right: 2 },

      minimumWheelAngle: 0.01,

      reducingWheelAngularVelocity: 0.6,

      steeringWheelAngularVelocity: 0.6,

      wheelRadius: 0.3,

      mass: 1500,

      frictionCoefficient: 0.8,

      centerToFront: 1,

      centerToBack: 0.8,

      fLatFactor: 10,

      fLatMax: 5,

      angularInertia: 100,

      state: {
        traction: 0,
        velocity: 0,
        longVelocity: 0,
        latVelocity: 0,
        acceleration: 0,
        angularVelocity: 0,
        angularAcceleration: 0,
        steeringLevel: 0,//this.steeringLevels.none,
        steeringDirection: 0,//this.steeringDirections.none,
        wheelAngle: 0,
        sideAngle: 0,
        sideSlipping: false,
        sideSlippingVelocity: 0,
        sideSlippingAcceleration: 0
      },

      setup: function(game_) {
        game = game_
        game.load.image('car', 'assets/car.png')
        powertrain.install(this)
      },

      create: function() {
        this.p = game.add.sprite(game.world.width / 2, game.world.height / 2, 'car')
        game.physics.enable(this.p)
        this.p.body.collideWorldBounds = true
      },

      setVelocity: function(level) {
        this.state.velocity += this.state.acceleration
        powertrain.automaticTransmission()

        if (level >= 0) {
          this.state.traction = powertrain.getTraction(this.pedalLevels[level])
        } else {
          this.state.traction = -this.frictionCoefficient * 9.8;
        }

        this.state.acceleration = drivingEnvironment.getPossibleAcceleration(this.state)

        // Even if acceleration brought velocity to below zero (i.e. braking), actual velocity cannot be lower than zero.
        if (this.state.velocity < 0) {
            this.state.velocity = 0
        }
      },

      updateLateralMovement: function() {
        if (this.state.longVelocity == 0 || this.state.wheelAngle == 0) {
            return
        }
        var aLat = this.state.longVelocity * this.state.longVelocity * Math.tan(Math.abs(this.state.sideAngle) / 180 * Math.PI)
            / (this.centerToBack + this.centerToFront) / 10000 - 9.8 * this.frictionCoefficient;

        if (aLat > 0) {
            this.state.sideSlippingAcceleration = aLat;
            this.state.sideSlipping = true;
        } else {
            this.state.sideSlippingAcceleration = 0; //debug only, replace with =0
            this.state.sideSlipping = false;
        }
        this.updateSideSlippingVelocity()
      },

      updateSideSlippingVelocity: function() {
        if (this.state.sideSlipping) {
            this.state.sideSlippingVelocity += this.state.sideSlippingAcceleration;
        } else {
            if (this.state.sideSlippingVelocity > 0) {
                this.state.sideSlippingVelocity -= 9.8 * this.frictionCoefficient;
                if (this.state.sideSlippingVelocity <= 0.1) {
                    this.state.sideSlippingVelocity = 0;
                }
            }
        }
      },

      /*updateAngulars: function() {
        this.p.angle += this.state.angularVelocity;
        this.state.angularVelocity += this.state.angularAcceleration;

        var alphaFront = 0;
        var alphaRear = 0;
        if (this.state.velocity != 0) {
          var alphaFront = Math.atan(this.state.angularVelocity / this.state.velocity) - this.state.wheelAngle;
          var alphaRear = Math.atan(-this.state.angularVelocity / this.state.velocity);
        }
        var fLatFront = this.fLatFactor * alphaFront;
        var fLatRear = this.fLatFactor * alphaRear;
        if (fLatFront > this.fLatMax) {
          fLatFront = this.fLatMax;
        }
        if (fLatRear > this.fLatMax) {
          fLatRear = this.fLatMax;
        }

        var torque = Math.cos(this.state.wheelAngle * Math.PI / 180) * fLatFront - fLatRear;
        torque = this.state.wheelAngle;
        this.state.angularAcceleration = torque / this.angularInertia
      },
      */

      rotate: function() {
          this.p.angle += this.state.angularVelocity;
          this.state.angularVelocity = this.state.latVelocity / (this.centerToBack + this.centerToFront) / 20;
      },

      updateWheelAngle: function() {
          if (this.state.steeringDirection == this.steeringLevels.none) {
              if (this.state.wheelAngle != 0) {
                  this.reduceWheelAngle();
              }
          } else {
              this.increaseWheelAngle();
          }

          this.state.longVelocity = this.state.velocity * Math.cos(this.state.wheelAngle / 180 * Math.PI)
          this.state.latVelocity = this.state.velocity * Math.sin(this.state.wheelAngle / 180 * Math.PI)

          if (this.state.latVelocity > 0) {
              this.state.latVelocity -= this.state.sideSlippingVelocity;
          } else if (this.state.latVelocity < 0) {
              this.state.latVelocity += this.state.sideSlippingVelocity;
          }
          if (this.state.longVelocity != 0) {
              this.state.sideAngle = Math.atan(this.state.latVelocity / this.state.longVelocity) / Math.PI * 180;
          } else {
              this.state.sideAngle = this.state.wheelAngle;
          }
      },

      reduceWheelAngle: function() {
          if (this.state.wheelAngle > 0) {
              this.state.wheelAngle -= this.reducingWheelAngularVelocity;
              if (this.state.wheelAngle < this.minimumWheelAngle) {
                  this.state.wheelAngle = 0;
              }
          } else {
              this.state.wheelAngle += this.reducingWheelAngularVelocity;
              if (this.state.wheelAngle > -this.minimumWheelAngle) {
                  this.state.wheelAngle = 0;
              }
          }
      },

      increaseWheelAngle: function() {
          var maxAngle = this.state.steeringLevel;
          if (this.state.steeringDirection == this.steeringDirections.right) {
              this.state.wheelAngle += this.steeringWheelAngularVelocity;
              if (this.state.wheelAngle > maxAngle) {
                  this.state.wheelAngle = maxAngle;
              }
          } else if (this.state.steeringDirection == this.steeringDirections.left) {
              this.state.wheelAngle -= this.steeringWheelAngularVelocity;
              if (this.state.wheelAngle < -maxAngle) {
                  this.state.wheelAngle = -maxAngle;
              }
          }

      },

      update: function() {
        var isDown = game.input.keyboard.isDown.bind(game.input.keyboard)

        if (isDown(Phaser.Keyboard.C) || isDown(Phaser.Keyboard.DOWN)) {
          this.setVelocity(-1)
        } else if (isDown(Phaser.Keyboard.F) || isDown(Phaser.Keyboard.UP)) {
          this.setVelocity(4)
        } else if (isDown(Phaser.Keyboard.D)) {
          this.setVelocity(3)
        } else if (isDown(Phaser.Keyboard.S)) {
          this.setVelocity(2)
        } else if (isDown(Phaser.Keyboard.A)) {
          this.setVelocity(1)
        } else {
          this.setVelocity(0)
        }

        if (isDown(Phaser.Keyboard.LEFT) || isDown(Phaser.Keyboard.J)) {
          this.state.steeringLevel = this.steeringLevels.normal;
          this.state.steeringDirection = this.steeringDirections.left;
        } else if (isDown(Phaser.Keyboard.RIGHT) || isDown(Phaser.Keyboard.K)) {
          this.state.steeringLevel = this.steeringLevels.normal;
          this.state.steeringDirection = this.steeringDirections.right;
        } else if (isDown(Phaser.Keyboard.H)) {
          this.state.steeringLevel = this.steeringLevels.sharp;
          this.state.steeringDirection = this.steeringDirections.left;
        } else if (isDown(Phaser.Keyboard.L)) {
            this.state.steeringLevel = this.steeringLevels.sharp;
            this.state.steeringDirection = this.steeringDirections.right;
        } else {
          this.state.steeringLevel = this.steeringLevels.none;
          this.state.steeringDirection = this.steeringDirections.none;
        }

        //this.updateAngulars()

        this.updateWheelAngle()
        this.updateLateralMovement()
        this.p.body.velocity = game.physics.arcade.velocityFromAngle(this.p.angle + this.state.sideAngle, this.state.longVelocity)
        this.rotate()
      },

      getSpeedMps: function() {
        return this.p.body.speed / 20
      },

      getSpeed: function() {
        var meter = 20 // in pixels
        var hour = 60 * 60 // in seconds
        var kilometer = 1000 // in meters
        var speed

        // Convert from pixels per second to KMPH
        speed = ((this.p.body.speed / 20) * hour) / kilometer

        return Math.round(speed)
      }
    }
  }
)