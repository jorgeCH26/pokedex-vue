import { inject } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import type { Store } from "./domain/store/store";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "home",
      path: "/",
      component: () => import("./ui/home/page/HomePage.vue"),
    },
    {
      name: "pokedex",
      path: "/pokedex",
      component: () => import("./ui/pokedex/pages/PokedexPage.vue"),
      meta: { requiresAuth: true },
    },
    {
      name: "pokemon-id",
      path: "/pokedex/:id",
      component: () => import("./ui/pokedex/pages/PokemonDetail.vue"),
      meta: { requiresAuth: true },
    },
    {
      name: "pokemon-favoritos",
      path: "/favoritos",
      component: () => import("./ui/pokedex/pages/PokemonFavoritosPage.vue"),
      meta: { requiresAuth: true },
    },
    {
      name: "pokemon-team",
      path: "/team-pokemon",
      component: () => import("./ui/pokedex/pages/PokemonTeamPage.vue"),
      meta: { requiresAuth: true },
    },
    {
      name: "pokemon-rival",
      path: "/team-rival-pokemon",
      component: () => import("./ui/pokedex/pages/PokemonTeamRival.vue"),
      meta: { requiresAuth: true },
    },
    {
      name: "pokemon-duelos",
      path: "/pokemon-duelos",
      component: () => import("./ui/pokedex/pages/PokemonVSPage.vue"),
      meta: { requiresAuth: true },
    },
    {
      name: "pokemon-registro",
      path: "/pokemon-registro",
      component: () => import("./ui/pokedex/pages/PokedexRegisterPage.vue"),
    },
    {
      name: "pokemon-registro-validadaor",
      path: "/pokemon-registro-validador",
      component: () => import("./ui/pokedex/pages/PokemonRegisterValidate.vue"),
    },
    {
      name: "pokemon-login",
      path: "/pokemon-login",
      component: () => import("./ui/auth/LoginPage.vue"),
    },
    {
      name: "pokemon-crear-usuario",
      path: "/pokemon-crear-usuario",
      component: () => import("./ui/auth/UserRegister.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  //const savedAuth = localStorage.getItem("pokemon-auth");
  //const isLoggedIn = savedAuth ? JSON.parse(savedAuth).isLoggedIn : false;

  const store = inject<Store>("store")!;

  const { isLoggedIn } = store.authStore;

  if (requiresAuth && !isLoggedIn.value) {
    return next("/pokemon-login");
  }

  if (
    isLoggedIn.value &&
    ["/pokemon-login", "/pokemon-crear-usuario"].includes(to.path)
  ) {
    return next("/pokedex");
  }

  next();
});
