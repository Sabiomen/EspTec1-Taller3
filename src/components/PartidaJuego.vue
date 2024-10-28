funciona mas o menos, arreglar mas tarde

<template>
    <div id="arena">
      <div id="player1" class="player" :style="{ backgroundImage: `url(${require(`@/assets/${jugador1Imagen}.png`)})`, left: player1X + 'px' }">
        {{ jugador1Nombre }} {{ player1Health }}
      </div>
      <div id="player2" class="player" :style="{ backgroundImage: `url(${require(`@/assets/${jugador2Imagen}.png`)})`, left: player2X + 'px' }">
        {{ jugador2Nombre }} {{ player2Health }}
      </div>
      <div id="powerup-attack" class="powerup attack" v-if="powerupAttackVisible" :style="{ left: powerupAttackX + 'px', top: '60px' }"></div>
      <div id="powerup-health" class="powerup health" v-if="powerupHealthVisible" :style="{ left: powerupHealthX + 'px', top: '60px' }"></div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PartidaJuego',
    data() {
      return {
        jugador1Nombre: localStorage.getItem("jugador1"),
        jugador2Nombre: localStorage.getItem("jugador2"),
        jugador1Imagen: localStorage.getItem("jugador1"),
        jugador2Imagen: localStorage.getItem("jugador2"),
        player1Health: 100,
        player2Health: 100,
        player1X: 0,
        player2X: 0,
        playerSpeed: 5,
        laserSpeed: 5,
        lasers: [],
        keys: {},
        powerupAttackX: 0,
        powerupHealthX: 0,
        powerupAttackVisible: false,
        powerupHealthVisible: false,
        powerupInterval: 5000,
        player1AttackDamage: 10,
        player2AttackDamage: 10
      };
    },
    mounted() {
      this.initializeGame();
    },
    methods: {
      initializeGame() {
        console.log(this.jugador1Nombre);
        console.log(this.jugador2Nombre);
       
        this.player1X = (this.$el.clientWidth / 2) - 85; // Ajustar posición inicial
        this.player2X = (this.$el.clientWidth / 2) - 85;
  
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
        this.spawnPowerup();
        this.gameLoop();
      },
      handleKeyDown(e) {
        this.keys[e.key] = true;
  
        if (e.key === 'w' && !this.keys['shootingPlayer1']) {
          this.shootLaser(this.player1X, 'up');
          this.keys['shootingPlayer1'] = true;
        } else if (e.key === 'ArrowUp' && !this.keys['shootingPlayer2']) {
          this.shootLaser(this.player2X, 'down');
          this.keys['shootingPlayer2'] = true;
        }
      },
      handleKeyUp(e) {
        this.keys[e.key] = false;
  
        if (e.key === 'w') this.keys['shootingPlayer1'] = false;
        if (e.key === 'ArrowUp') this.keys['shootingPlayer2'] = false;
      },
      gameLoop() {
        // Movimiento y lógica de juego aquí...
        if (this.keys['a'] && this.player1X > 0) {
          this.player1X -= this.playerSpeed;
        } else if (this.keys['d'] && this.player1X < this.$el.clientWidth - 171) {
          this.player1X += this.playerSpeed;
        }
  
        if (this.keys['ArrowLeft'] && this.player2X > 0) {
          this.player2X -= this.playerSpeed;
        } else if (this.keys['ArrowRight'] && this.player2X < this.$el.clientWidth - 171) {
          this.player2X += this.playerSpeed;
        }
  
        // Lógica de colisión y ataque
        this.moveLasers();
        requestAnimationFrame(this.gameLoop);
      },
      shootLaser(xPosition, direction) {
        const laser = document.createElement('div');
        laser.classList.add('laser');
        laser.style.left = `${xPosition + 75}px`;
        laser.direction = direction;
  
        if (direction === 'up') {
          laser.style.bottom = '60px';
        } else {
          laser.style.top = '60px';
        }
  
        this.$el.appendChild(laser);
        this.lasers.push(laser);
      },
      moveLasers() {
        // Mover láseres y comprobar colisiones aquí...
      },
      spawnPowerup() {
        const powerupType = Math.random() < 0.5 ? 'attack' : 'health';
        if (powerupType === 'attack') {
          this.powerupAttackX = Math.floor(Math.random() * (this.$el.clientWidth - 40));
          this.powerupAttackVisible = true;
        } else {
          this.powerupHealthX = Math.floor(Math.random() * (this.$el.clientWidth - 40));
          this.powerupHealthVisible = true;
        }
  
        setTimeout(this.spawnPowerup, this.powerupInterval);
      }
      // ... Agregar otras funciones aquí
    }
  };
  </script>
  
  <style scoped>
  body {
    margin: 0;
    padding: 0;
    background-color: #111;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    color: white;
    font-family: Arial, sans-serif;
    flex-direction: column;
  }
  #arena {
    position: relative;
    width: 1200px;
    height: 600px;
    margin: 0 auto;
    background-color: #333;
    border: 2px solid #555;
    background-image: url('../assets/starry.png');
  }
  .player {
    position: absolute;
    width: 171px;
    height: 171px;
    background-size: cover;
  }
  #player1 {
    bottom: 0;
    left: 50%;

  }
  #player2 {
    top: 0;
    left: 50%;
  }
  .laser {
    position: absolute;
    width: 4px;
    height: 20px;
    background-color: yellow;
  }
  .powerup {
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .powerup.attack {
    background-color: red;
  }
  .powerup.health {
    background-color: green;
  }
  </style>