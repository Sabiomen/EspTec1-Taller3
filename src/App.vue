<template>
  <nav>
    <div class="links-header">
      <router-link to="/">Pagina Principal</router-link> |
      <router-link to="/personajes">Wiki Personajes</router-link> |
      <router-link to="/funciones">Wiki Funciones</router-link>
    </div>
  </nav>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: black;
}

nav {
  padding: 30px; 
}

nav a {
  font-weight: bold;
  color: #42b983;
  margin: 0 10px;
}

nav a.router-link-exact-active {
  color: #ffffff;
}

.links-header {
}
</style>