<template>
    <div class= "menu-juego-container">
      <div class="container">
      <h1>Selecciona tu Personaje</h1>
  
      <div class="jugador" id="player1">
        <h2>{{ username || 'Jugador 1' }}</h2>
        <div class="personajes">
          <div class="contenedor" v-for="personaje in personajes" :key="personaje.id">
            <img :src="personaje.img" :alt="personaje.nombre" />
            <button @click="seleccionarPersonaje(personaje.id, 1)">{{ personaje.nombre }}</button>
          </div>
        </div>
      </div>
  
      <div class="jugador" id="player2">
        <h2>Jugador 2</h2>
        <div class="personajes">
          <div class="contenedor" v-for="personaje in personajes" :key="personaje.id">
            <img :src="personaje.img" :alt="personaje.nombre" />
            <button @click="seleccionarPersonaje(personaje.id, 2)">{{ personaje.nombre }}</button>
          </div>
        </div>
      </div>

      <button @click="iniciarPartida">Iniciar Partida</button>
      <button @click="regresarInicio">Regresar al Inicio</button>
    </div>
    </div>
    
  </template>
  
  <script>
  export default {
    name: 'MenuJuego',
    data() {
    return {
        personajes: [
            {
                id: 'personaje1',
                nombre: 'Zaku II Char Aznable',
                img: require('../assets/Zakuiiselectscreen.png'),
            },
            {
                id: 'personaje2',
                nombre: 'El MegaHombre',
                img: require('../assets/megadoodselect.png'),
            },
            {
                id: 'personaje3',
                nombre: 'Sus',
                img: require('../assets/personaje3.png'),
            },
        ],
        seleccionJugador1: null,
        seleccionJugador2: null,
        username: localStorage.getItem('username') 
    };
},
    methods: {
      seleccionarPersonaje(personaje, jugador) {
        if (jugador === 1) {
          if (this.seleccionJugador1) {
            alert('Jugador 1 ya ha seleccionado un personaje.');
            return;
          }
          if (personaje === this.seleccionJugador2) {
            alert('Este personaje ya ha sido seleccionado por el Jugador 2.');
            return;
          }
          this.seleccionJugador1 = personaje;
          alert('Jugador 1 ha seleccionado: ' + personaje);
        } else {
          if (this.seleccionJugador2) {
            alert('Jugador 2 ya ha seleccionado un personaje.');
            return;
          }
          if (personaje === this.seleccionJugador1) {
            alert('Este personaje ya ha sido seleccionado por el Jugador 1.');
            return;
          }
          this.seleccionJugador2 = personaje;
          alert('Jugador 2 ha seleccionado: ' + personaje);
        }
      },
      iniciarPartida() {
      if (!this.seleccionJugador1 || !this.seleccionJugador2) {
        alert('Ambos jugadores deben seleccionar un personaje.');
        return;
      }
        localStorage.setItem('jugador1', this.seleccionJugador1);
        localStorage.setItem('jugador2', this.seleccionJugador2);
        localStorage.setItem('jugador1Nombre', this.username); 
        this.$router.push('/partida');
      },
      regresarInicio() {
        this.$router.push('/home');
      },
    },
  };
  </script>

  <style scoped>
  .menu-juego-container {
    background-image: url('@/assets/universo2.jpg'); /* Ruta a tu imagen de fondo */
    background-size: cover;
    background-position: center;
    min-height: 100vh; /* Asegura que el fondo cubra toda la altura de la ventana */
  }
  .container {
    margin: auto;
    max-width: 700px;
    height: 1100px;
  }
  h1{
    padding-top: 5%;
    padding-bottom: 2%;
    margin-top: 0px;
    color: white;
  }
  h2{
    color: white;
  }
  .jugador {
    margin: 25px;
    padding: 20px;
    border: 2px solid #070707;
    border-radius: 10px;
    background-color: #1a1a1a;
    transition: transform 0.2s;
  }
  
  .jugador:hover {
    transform: scale(1.02);
  }
  
  .personajes {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 60px;
  }
  
  .personajes img {
    width: 150px;
    height: 225px;
  }
  
  button {
    margin: 5px;
    padding: 15px 30px;
    font-size: 16px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    background-color: #94302b;
    color: white;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>