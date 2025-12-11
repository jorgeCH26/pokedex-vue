<template>
  <nav class="bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500 shadow-md">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 relative">
      <!-- Logo -->
      <router-link to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img :src="logo" class="h-10" alt="PokeLogo" />
      </router-link>

      <!-- Nombre centrado -->
      <div v-if="user?.name"
        class="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold text-black text-center">
        {{ user.name }}
      </div>

      <!-- Botón Hamburguesa -->
      <button @click="toggleMenu" type="button"
        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
        aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <!-- Menú -->
      <div :class="['w-full md:block md:w-auto', isMenuOpen ? 'block' : 'hidden']" id="navbar-default">
        <ul
          class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-white/30 rounded-lg bg-white/20 backdrop-blur-md md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent text-white">
          <li>
            <router-link to="/"
              class="block py-2 px-3 rounded hover:bg-white/30 md:hover:bg-transparent md:hover:text-white"
              @click="closeMenu">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
                alt="pokeball" class="inline w-5 h-5 mr-2" />
              Home
            </router-link>
          </li>
          <li>
            <template v-if="isLoggedIn">
              <router-link to="/pokedex"
                class="block py-2 px-3 rounded hover:bg-white/30 md:hover:bg-transparent md:hover:text-white"
                @click="closeMenu">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
                  alt="pokeball" class="inline w-5 h-5 mr-2" />
                Ver todos los Pokémons
              </router-link>
            </template>

            <template v-else>
              <router-link to="/pokemon-login"
                class="block py-2 px-3 rounded hover:bg-white/30 md:hover:bg-transparent md:hover:text-white"
                @click="closeMenu">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
                  alt="pokeball" class="inline w-5 h-5 mr-2" />
                Inicia sesión
              </router-link>
            </template>
          </li>
          <li>
            <template v-if="isLoggedIn">
              <button @click="logoutSession"
                class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full text-left">
                Cerrar sesión
              </button>
            </template>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import logo from '../../assets/logo.png'
import { useAuthLoginAxios } from '../../ui/pokedex/composables/useLoging';
import { useRouter } from 'vue-router';

const router = useRouter();

const { user, isLoggedIn, logout } = useAuthLoginAxios();

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const logoutSession = () => {
  logout();
  router.push({ name: "pokemon-login" });
}
</script>
