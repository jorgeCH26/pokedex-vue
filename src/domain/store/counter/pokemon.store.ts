import { provide, ref, watch, type InjectionKey } from "vue";
import type { PokemonState } from "./pokemon.state";
import type { Pokemon } from "../../interface/ui/Pokemon.interface";
import { getPokemonById, getPokemons } from "../../api/pokemom-services";

export const PokemonKey = Symbol() as InjectionKey<PokemonState>;
export const providePokemonStore = (): PokemonState => {
  const pokemons = ref<Pokemon[]>([]);
  const pokemonSelect = ref<Pokemon | null>(null);
  const isLoading = ref();

  const offsetValue = ref();

  const limit = 200;

  const limitPokemon = ref(10);

  const limitPage = 10;

  const limitInferior = 0;

  const setInitialValue = (value: number) => {
    offsetValue.value = value;
  };

  const setLimitPokemons = (value: number) => {
    limitPokemon.value = value;
  };

  const loadPokemons = async () => {
    isLoading.value = true;

    try {
      const pokemonRest = await getPokemons(offsetValue.value * limitPage, limitPokemon.value);
      pokemons.value = pokemonRest;
    } catch (err) {
      console.error("Error loading pokemons:", err);
    } finally {
      setTimeout(() => {
        isLoading.value = false;
      }, 2000);
    }
  };

  const loadPokemonById = async (id: number) => {
    isLoading.value = true;

    try {
      const pokemonRest = await getPokemonById(id);
      pokemonSelect.value = pokemonRest;
    } catch (err) {
      console.error("Error loading pokemons:", err);
    } finally {
      setTimeout(() => {
        isLoading.value = false;
      }, 2000);
    }
  };

  const nextPage = async () => {
    if (offsetValue.value + 10 >= limit) {
      console.warn("Reached the maximum limit of 200 Pokémon.");
      return;
    }
    offsetValue.value++;
  };

  const previousPage = async () => {
    if (offsetValue.value <= limitInferior) {
      console.warn("Reached the minimum limit of 0 Pokémon.");
      return;
    }
    offsetValue.value--;
  };

  watch(offsetValue, () => {
    loadPokemons();
  });


  const store: PokemonState = {
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
  };

  provide(PokemonKey, store);

  return store;
};
