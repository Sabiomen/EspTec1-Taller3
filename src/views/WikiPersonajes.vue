<template>
    <div class="wiki-personajes">
      <h1>Wiki Personajes</h1>
      <p>Aquí encontrarás información sobre los personajes.</p>
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
  </template>
  
  <script>
  export default {
    name: 'WikiPersonajes'
  }
  </script>
  
  <style scoped>
.wiki-personajes {
  background-color: #121212;
  color: white;
  padding: 20px;
  min-height: 100vh;
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
  </style>