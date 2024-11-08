import { createRouter, createWebHashHistory } from 'vue-router';
import IniciarSesion from '@/views/IniciarSesion.vue';
import WikiPersonajes from '../views/WikiPersonajes.vue';
import Scoreboard from '../views/Scoreboard.vue';
import MenuJuego from '../components/MenuJuego.vue';
import PartidaJuego from '../components/PartidaJuego.vue';

const routes = [
  {
    path: '/wiki-juego-disparos/',
    name: 'home',
    component: IniciarSesion
  },
  {
    path: '/register',
    name: 'crear-cuenta',
    component: () => import('../views/RegistrarUsuario.vue')
  },
  {
    path: '/home',
    name: 'wiki',
    component: () => import('../views/WikiPrincipal.vue')
  },
  {
    path: '/personajes',
    name: 'personajes',
    component: WikiPersonajes
  },
  {
    path: '/scoreboard',
    name: 'scoreboard',
    component: Scoreboard
  },
  {
    path: '/menu',
    name: 'menu',
    component: MenuJuego
  },
  {
    path: '/partida',
    name: 'partida',
    component: PartidaJuego
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;