<template>
  <div id="arena">
    <div id="player1" ref="player1" class="player"
      :style="{ backgroundImage: `url(${require(`@/assets/${jugador1Imagen}.png`)})`, left: player1X + 'px' }">
      {{ jugador1Nombre }} {{ player1Health }}
    </div>
    <div id="player2" ref="player2" class="player"
      :style="{ backgroundImage: `url(${require(`@/assets/${jugador2Imagen}.png`)})`, left: player2X + 'px' }">
      {{ jugador2Nombre }} {{ player2Health }}
    </div>

    <div id="powerup-attack" class="powerup attack" v-if="powerupAttackVisible"
     :style="{ left: powerupAttackX + 'px', top: powerupAttackY + 'px' }"></div>
<div id="powerup-health" class="powerup health" v-if="powerupHealthVisible"
     :style="{ left: powerupHealthX + 'px', top: powerupHealthY + 'px' }"></div>

    <div v-for="(laser, index) in lasers" :key="index" class="laser"
      :style="{ left: laser.x + 'px', top: laser.y + 'px' }">
    </div>
  </div>
</template>

<script>
import beamEffect from '@/assets/beam_effect.mp3';
import backgroundMusic from '@/assets/background_music.mp3';

export default {
  name: 'PartidaJuego',
  data() {
    return {
      jugador1Nombre: localStorage.getItem('jugador1Nombre') || 'Jugador 1',  
      jugador2Nombre: "Jugador 2",
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
      player2AttackDamage: 10,
      player1Wins: parseInt(localStorage.getItem('player1Wins')) || 0,
      beamEffect: new Audio(beamEffect),
      backgroundMusic: new Audio(backgroundMusic),
    };
  },
  mounted() {
    this.initializeGame();
  },
  methods: {

    initializeGame() {
    this.$nextTick(() => {
      this.player1X = (this.$el.clientWidth / 2) - 85; 
      this.player2X = (this.$el.clientWidth / 2) - 85;

      document.addEventListener('keydown', this.handleKeyDown);
      document.addEventListener('keyup', this.handleKeyUp);

      this.backgroundMusic.loop = true;
      this.backgroundMusic.volume = 1;
      this.backgroundMusic.play();

      this.spawnPowerup();
      this.gameLoop();
    });
  },
  incrementarGanadas() {
  this.player1Wins += 1;
  localStorage.setItem('player1Wins', this.player1Wins.toString());
},
    handleKeyDown(e) {
      if (!this.$refs.player1 || !this.$refs.player2) return;
      this.keys[e.key] = true;

      if (e.key === 'w' || e.key === 'W' && !this.keys['shootingPlayer1']) {
        this.shootLaser(this.player1X, 'up', 1);
        this.keys['shootingPlayer1'] = true;
      } else if (e.key === 'ArrowUp' && !this.keys['shootingPlayer2']) {
        this.shootLaser(this.player2X, 'down', 2);
        this.keys['shootingPlayer2'] = true;
      }
    },

    handleKeyUp(e) {
      if (!this.$refs.player1 || !this.$refs.player2) return;
      this.keys[e.key] = false;
      if (e.key === 'w' || e.key ==='W') this.keys['shootingPlayer1'] = false;
      if (e.key === 'ArrowUp') this.keys['shootingPlayer2'] = false;
    },
    gameLoop() {
      if (!this.$refs.player1 || !this.$refs.player2) return;
      if (this.keys['a'] || this.keys['A'] && this.player1X > 0) {
        this.player1X -= this.playerSpeed;
      } else if (this.keys['d'] || this.keys['D'] && this.player1X < this.$el.clientWidth - 171) {
        this.player1X += this.playerSpeed;
      }

      if (this.keys['ArrowLeft'] && this.player2X > 0) {
        this.player2X -= this.playerSpeed;
      } else if (this.keys['ArrowRight'] && this.player2X < this.$el.clientWidth - 171) {
        this.player2X += this.playerSpeed;
      }

      this.moveLasers();
      this.checkPowerupCollision();
      requestAnimationFrame(this.gameLoop);
    },

    shootLaser(xPosition, direction, player) {
      const shootingSoundClone = this.beamEffect.cloneNode();
      shootingSoundClone.play();
      const laser = {
        x: xPosition + 75, 
        y: direction === 'up' ? this.$refs.player1.offsetTop : this.$refs.player2.offsetTop + this.$refs.player2.offsetHeight,
        direction: direction,
        player: player
      };
      this.lasers.push(laser);
    },

    moveLasers() {
      this.lasers = this.lasers.filter((laser, index) => {
        if (laser.direction === 'up') {
          laser.y -= this.laserSpeed;

          if (laser.y <= 0) return false; 
          if (this.checkCollision(laser, this.$refs.player2)) {
            this.player2Health -= this.player1AttackDamage;
            if (this.player2Health <= 0) this.endGame(1);
            return false;
          }
        } else {
          laser.y += this.laserSpeed; 

          if (laser.y >= this.$el.clientHeight) return false; 
          if (this.checkCollision(laser, this.$refs.player1)) {
            this.player1Health -= this.player2AttackDamage;
            if (this.player1Health <= 0) this.endGame(2);
            return false;
          }
        }
        return true;
      });
    },
    spawnPowerup() {
    if (!this.$refs.player1 || !this.$refs.player2) return;

  const powerupType = Math.random() < 0.5 ? 'attack' : 'health';
  const targetPlayer = Math.random() < 0.5 ? 'player1' : 'player2';
  const playerTopPosition = targetPlayer === 'player1' ? this.$refs.player1.offsetTop : this.$refs.player2.offsetTop;

  if (powerupType === 'attack') {
    this.powerupAttackX = Math.floor(Math.random() * (this.$el.clientWidth - 40));
    this.powerupAttackY = playerTopPosition;
    this.powerupAttackVisible = true;
    this.powerupAttackOwner = targetPlayer; 
  } else {
    this.powerupHealthX = Math.floor(Math.random() * (this.$el.clientWidth - 40));
    this.powerupHealthY = playerTopPosition;
    this.powerupHealthVisible = true;
    this.powerupHealthOwner = targetPlayer; 
  }

  setTimeout(this.spawnPowerup, this.powerupInterval);
},
checkPowerupCollision() {
  if (this.powerupAttackVisible) {
    if (this.powerupAttackOwner === 'player1' && this.checkPlayerCollision(this.$refs.player1, this.powerupAttackX)) {
      this.applyAttackPowerup(1);
      this.powerupAttackVisible = false;
    } else if (this.powerupAttackOwner === 'player2' && this.checkPlayerCollision(this.$refs.player2, this.powerupAttackX)) {
      this.applyAttackPowerup(2);
      this.powerupAttackVisible = false;
    }
  }

  if (this.powerupHealthVisible) {
    if (this.powerupHealthOwner === 'player1' && this.checkPlayerCollision(this.$refs.player1, this.powerupHealthX)) {
      this.applyHealthPowerup(1);
      this.powerupHealthVisible = false;
    } else if (this.powerupHealthOwner === 'player2' && this.checkPlayerCollision(this.$refs.player2, this.powerupHealthX)) {
      this.applyHealthPowerup(2);
      this.powerupHealthVisible = false;
    }
  }
},

    applyAttackPowerup(player) {
      if (player === 1) {
      this.player1AttackDamage = 15;  
      setTimeout(() => {
        this.player1AttackDamage = 10;  
      }, 5000);
    } else if (player === 2) {
      this.player2AttackDamage = 15;
      setTimeout(() => {
        this.player2AttackDamage = 10; 
      }, 5000);
    }
},

    applyHealthPowerup(player) {
      if (player === 1) {
        this.player1Health = Math.min(this.player1Health + 20, 100);
      } else {
        this.player2Health = Math.min(this.player2Health + 20, 100);
      }
    },
    checkPlayerCollision(player, powerupX) {
      const playerRect = player.getBoundingClientRect();
      return powerupX >= playerRect.left && powerupX <= playerRect.right;
    },
    checkCollision(laser, player) {
    if (!player) return false; // Verifica que el player exista
    const laserRect = { left: laser.x, top: laser.y, right: laser.x + 5, bottom: laser.y + 20 };
    const playerRect = player.getBoundingClientRect();
    return !(laserRect.right < playerRect.left ||
      laserRect.left > playerRect.right ||
      laserRect.bottom < playerRect.top ||
      laserRect.top > playerRect.bottom);
  },

    endGame(winningPlayer) {
      if (winningPlayer === 1) {
    this.incrementarGanadas();
  }
      const userChoice = confirm(`¡Gana el Jugador ${winningPlayer}!\n¿Quieres regresar al menú? Presiona "Aceptar" para regresar o "Cancelar" para jugar otra partida.`);
      if (userChoice) {
      this.backgroundMusic.pause();
      this.backgroundMusic.currentTime = 0;
      this.$router.push('/menu'); 
    } else {
      this.backgroundMusic.pause();
      this.backgroundMusic.currentTime = 0;
      this.resetGame();
    }  
    },

    resetGame() {
      this.player1Health = 100;
      this.player2Health = 100;
      this.player1AttackDamage= 10;
      this.player2AttackDamage= 10;
      this.player1X = (this.$el.clientWidth / 2) - 85;
      this.player2X = (this.$el.clientWidth / 2) - 85;
      this.lasers = [];
      for (let key in this.keys) {
        this.keys[key] = false;
    }
    this.backgroundMusic.play();
    
    }
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
  width: auto;
  height: 728px;
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