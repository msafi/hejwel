'use strict';

angular.module('hejwel')

.service('car',
  function(config, powertrain, drivingEnvironment) {
    var game = {}

    return {
      powertrain: powertrain,

      pedalLevels: { 0: 0, 1: 0.25, 2: 0.5, 3: 0.75, 4: 1 },

      wheelRadius: 0.3,

      mass: 1500,

      frictionCoefficient: 0.8,

      fLatFactor: 10,

      fLatMax: 5,

      angularInertia: 100,

      state: {
        traction: 0,
        velocity: 0,
        acceleration: 0,
        angularVelocity: 0,
        angularAcceleration: 0,
        wheelAngle: 0
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
        if (this.state.velocity < 0)
          this.state.velocity = 0
      },

      updateAngulars: function() {
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

        if (isDown(Phaser.Keyboard.LEFT)) {
          this.state.wheelAngle = -15;
        } else if (isDown(Phaser.Keyboard.RIGHT)) {
          this.state.wheelAngle = 15;
        } else {
          this.state.wheelAngle = 0;
        }

        this.updateAngulars()
        this.p.body.velocity = game.physics.arcade.velocityFromAngle(this.p.angle, this.state.velocity)
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