<template>
  <div class="wiki-principal">
    <div class="fondo-overlay"></div>
    <button @click="cerrarSesion" class="cerrar-sesion">Cerrar sesión</button>
    <div class="contenido-central">
      <h1>Bienvenido al Juego de Disparos</h1>
      <nav class="nav-interior">
        <router-link to="/personajes">Wiki Personajes</router-link> |
        <router-link to="/scoreboard">Scoreboard</router-link> |
        <router-link to="/menu">Empezar el juego</router-link>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WikiPrincipal',
  methods: {
    cerrarSesion() {
      this.$router.push('/PA_Avance-AulaVirtual/');
    }
  }
}
</script>

<style scoped>
.wiki-principal {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background-image: url('@/assets/universo.jpg');
  background-size: cover;
  background-position: center;
  color: white;
}

.fondo-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1;
}

.contenido-central {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
  text-align: center;
}

.cerrar-sesion {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: red;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  z-index: 3;
}

.cerrar-sesion:hover {
  background-color: darkred;
}

.nav-interior {
  margin-top: 20px;
}

.nav-interior a {
  color: #42b983;
  text-decoration: none;
  margin: 0 10px;
}

.nav-interior a:hover {
  text-decoration: underline;
}

h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}
</style>