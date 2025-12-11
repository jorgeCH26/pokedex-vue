import { computed, inject, onMounted } from "vue";
import type { Store } from "../../../domain/store/store";

export const usePokemonAxios = (offSet: number , limit: number) => {
  const store = inject<Store>("store");

  if (!store) {
    throw new Error("Store no encontrado. Asegúrate de proporcionar el store en el componente padre.");
  }

  const {
    pokemons,
    loadPokemons,
    isLoading,
    nextPage,
    previousPage,
    offsetValue,
    setInitialValue,
    pokemonSelect,
    loadPokemonById,
    setLimitPokemons
  } = store.pokemon;

  onMounted(() => {
    if (setInitialValue) {
      setInitialValue(offSet);
    }

    if (setLimitPokemons) {
      setLimitPokemons(limit);
    }
  });

  const firstPokemon = computed(() => pokemons.value[0]);
  const lastPokemon = computed(() => pokemons.value[pokemons.value.length - 1]);

  return {
    pokemons,
    loadPokemons,
    isLoading,
    nextPage,
    previousPage,
    offsetValue,
    firstPokemon,
    lastPokemon,
    pokemonSelect,
    loadPokemonById,
    setLimitPokemons
  };
};
