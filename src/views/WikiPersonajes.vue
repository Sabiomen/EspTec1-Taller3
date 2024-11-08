<template>
    <div class="wiki-personajes">
      <h1>Wiki Personajes</h1>
      <p>Aquí encontrarás información sobre los personajes.</p>
      <div class="contenedor">
        <div class="info-personajes">
            <img src="../assets/megadoodselect.png" alt="El Megahombre" class="foto-personajes"/>
            <h3>El Megahombre:</h3>
            <p>El hermano deforme de Megaman, se caracteriza por ser exactamente igual a su hermano, excepto que es bien feo</p>
        </div>
        <div class="info-personajes">
            <img src="../assets/Zakuiiselectscreen.png" alt="Zaku II Char Aznable Custom" class="foto-personajes"/>
            <h3>Zaku II Char Aznable Custom: </h3>
            <p>El Mobile Suit del Cometa Rojo del Principado, se caracteriza por ir tres veces mas rapido que el Zaku II promedio.</p>
        </div>
        <div class="info-personajes">
            <img src="../assets/personaje3.png" alt="El Sus Cafe" class="foto-personajes"/>
            <h3>El Sus Cafe: </h3>
            <p>El Sus Cafe es un personaje que se caracteriza por ser cafe, y ser bien sus.</p>
        </div>
      </div>  
      
    </div>
    <button @click="regresarInicio">Regresar al Inicio</button>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: localStorage.getItem('username')
      }
    },
    methods: {
    regresarInicio() {
      this.$router.push('/home');
    },
  },
    name: 'WikiPersonajes'
    
  }
  </script>
  
  <style scoped>
.wiki-personajes {
  background-color: #121212;
  color: white;
  padding: 20px;
  min-height: 100vh;
  background-image: url('@/assets/universo.jpg'); /* Ruta a tu imagen de fondo */
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}


.info-personajes {
  display: flex; 
  align-items: center; 
  margin-bottom: 20px;
}

.foto-personajes {
  width: 200px;
  margin-right: 20px; 
}

.info-personajes h3 {
  margin: 0;
}

.info-personajes p {
  margin: 3px 0 0;
  margin-left: 5px;
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
.contenedor {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    
  }
  h1 {
    color: rgb(0, 0, 0);
    font-size: 3rem;
    font-weight: 800;
    
  }
  h3 {
    color: rgb(0, 0, 0);
    font-size: 1.5rem ;
    font-weight: 900;
  }
  p {
    color: rgb(0, 0, 0);
    font-size: 1.5rem;
    font-weight: 700;
  }
  </style>