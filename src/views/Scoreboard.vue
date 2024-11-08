<template>
  <div class="record-screen">
    <h2>Récord de Partidas Ganadas</h2>
    <p>{{ username }} ha ganado {{ player1Wins }} partidas.</p>
    <button @click="regresarInicio">Regresar al Inicio</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: localStorage.getItem('username'),
      player1Wins: parseInt(localStorage.getItem('player1Wins')) || 0,
    };
  },
  methods: {
    regresarInicio() {
      this.$router.push('/home');
    },
  },

};
</script>

<style>
.record-screen {
  text-align: center;
  padding: 20px;
  height: 720px;
  background-image: url('@/assets/universo.jpg'); 
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  h2 {
    color: rgb(0, 0, 0);
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 0%;
  }
  p {
    color: rgb(0, 0, 0);
    font-size: 1.5rem;
    font-weight: 600;
  }
  
  button:hover {
    background-color: #0056b3;
  }
</style>