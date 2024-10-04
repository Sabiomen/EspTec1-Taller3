<template>
  <div class="wiki-principal">
    <h1>Bienvenido al Juego de Disparos</h1>
    <nav class="nav-interior">
      <router-link to="/personajes">Wiki Personajes</router-link> |
      <router-link to="/funciones">Wiki Funciones</router-link> |
      <router-link to="/menu">Empezar el juego</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'WikiPrincipal'
}
</script>

<style scoped>
.wiki-principal {
  background-color: black;
  color: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.nav-interior {
  margin-top: 20px;
 
}

.nav-interior a {
  color: #42b983;
  text-decoration: none;
}

.nav-interior a:hover {
  text-decoration: underline;
}
</style>