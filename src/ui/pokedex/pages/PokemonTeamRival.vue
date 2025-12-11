<template>
  <section
    class="flex justify-center items-center min-h-screen w-full p-4 transition-all duration-3000"
    :style="{ background: randomGradient }"
  >
    <div class="w-full">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 p-10 lg:grid-cols-3">
        <div v-for="pokemon in pokemonSelectRival" :key="pokemon.id" class="flex justify-center">
          <PokemonCardDetail :pokemon="pokemon" />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import PokemonCardDetail from '../components/pokemonCardDetail.vue'
import { usePokemonSelectedTeam } from '../composables/usePokemonSelected'

const { pokemonSelectRival } = usePokemonSelectedTeam()

const colors = ['red', 'blue', 'green', 'purple', 'yellow', 'pink', 'orange']
const getRandomGradient = () => {
  const randomColor1 = colors[Math.floor(Math.random() * colors.length)]
  const randomColor2 = colors[Math.floor(Math.random() * colors.length)]
  return `linear-gradient(to right, ${randomColor1}, ${randomColor2})`
}

const randomGradient = ref(getRandomGradient())

let gradientInterval: number


onMounted(() => {
  gradientInterval = setInterval(() => {
    randomGradient.value = getRandomGradient()
  }, 1000)
})



onBeforeUnmount(() => {
  clearInterval(gradientInterval)
})
</script>

<style scoped>
section {
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
</style>
