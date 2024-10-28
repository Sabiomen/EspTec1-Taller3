import { createRouter, createWebHashHistory } from 'vue-router';
import IniciarSesion from '@/views/IniciarSesion.vue';
import WikiPersonajes from '../views/WikiPersonajes.vue';
import WikiFunciones from '../views/WikiFunciones.vue';
import MenuJuego from '../components/MenuJuego.vue';
import PartidaJuego from '../components/PartidaJuego.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: IniciarSesion
  },
  {
    path: '/crear-cuenta',
    name: 'crear-cuenta',
    component: () => import('../views/RegistrarUsuario.vue')
  },
  {
    path: '/inicio',
    name: 'wiki',
    component: () => import('../views/WikiPrincipal.vue')
  },
  {
    path: '/personajes',
    name: 'personajes',
    component: WikiPersonajes
  },
  {
    path: '/funciones',
    name: 'funciones',
    component: WikiFunciones
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