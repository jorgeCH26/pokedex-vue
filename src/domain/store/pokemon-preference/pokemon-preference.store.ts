import { provide, ref, watch, type InjectionKey } from "vue";
import type { PokemonsPreferenceState } from "./pokemon-preference.state";
import type { Pokemon } from "../../interface/ui/Pokemon.interface";

export const PokemonKey = Symbol() as InjectionKey<PokemonsPreferenceState>;

export const providePokemonPreferenceStore = (): PokemonsPreferenceState => {
  const storedFavorites = localStorage.getItem("pokemonsFavoritos");
  const storedTeam = localStorage.getItem("pokemonsTeam");
  const storedTeamRival = localStorage.getItem("pokemonsTeamRival");
  const pokemonsFavoritos = ref<Pokemon[]>(
    storedFavorites ? JSON.parse(storedFavorites) : []
  );
  const pokemonSelect = ref<Pokemon[]>(
    storedTeam ? JSON.parse(storedTeam) : []
  );
  const pokemonSelectRival = ref<Pokemon[]>(
    storedTeamRival ? JSON.parse(storedTeamRival) : []
  );
  const maxSelect = 3;
  const maxSelectrival = 3;
  const maxTeam = ref(false);
  const maxTeamRival = ref(false);

  const isFavorite = (pokemon: Pokemon) => {
    return pokemonsFavoritos.value.some((p) => p.id === pokemon.id);
  };

  const deleteFavoritoPokemon = (pokemon: Pokemon) => {
    pokemonsFavoritos.value = pokemonsFavoritos.value.filter(
      (p) => p.id !== pokemon.id
    );
  };

  const addFavoritoPokemon = (pokemon: Pokemon) => {
    if (!isFavorite(pokemon)) {
      pokemonsFavoritos.value.push(pokemon);
    } else {
      deleteFavoritoPokemon(pokemon);
    }
    localStorage.setItem(
      "pokemonsFavoritos",
      JSON.stringify(pokemonsFavoritos.value)
    );
  };

  watch(
    pokemonsFavoritos,
    (newFavorites) => {
      localStorage.setItem("pokemonsFavoritos", JSON.stringify(newFavorites));
    },
    { deep: true }
  );

  watch(
    pokemonSelect,
    (newTeam) => {
      localStorage.setItem("pokemonsTeam", JSON.stringify(newTeam));
    },
    { deep: true }
  );

  watch(
    pokemonSelectRival,
    (newTeam) => {
      localStorage.setItem("pokemonsTeamRival", JSON.stringify(newTeam));
    },
    { deep: true }
  );

  const isSelected = (pokemon: Pokemon) => {
    return pokemonSelect.value.some((p) => p.id === pokemon.id);
  };

  const removeStorePokemon = (pokemon: Pokemon) => {
    pokemonSelect.value = pokemonSelect.value.filter(
      (p) => p.id !== pokemon.id
    );
  };

  const addStorePokemon = (pokemon: Pokemon) => {
    if (!isSelected(pokemon)) {
      if (pokemonSelect.value.length < maxSelect) {
        pokemonSelect.value.push(pokemon);
      }
    } else {
      removeStorePokemon(pokemon);
    }
    localStorage.setItem("pokemonsTeam", JSON.stringify(pokemonSelect.value));
  };

  watch(
    pokemonSelect,
    (pokemons) => {
      maxTeam.value = pokemons.length === maxSelect;
    },
    { deep: true }
  );

  const isSelectedRival = (pokemon: Pokemon) => {
    return pokemonSelectRival.value.some((p) => p.id === pokemon.id);
  };

  const removeRivalPokemon = (pokemon: Pokemon) => {
    pokemonSelectRival.value = pokemonSelectRival.value.filter(
      (p) => p.id !== pokemon.id
    );
  };

  const addRivalPokemon = (pokemon: Pokemon) => {
    if (!isSelectedRival(pokemon)) {
      if (pokemonSelectRival.value.length < maxSelect) {
        pokemonSelectRival.value.push(pokemon);
      }
    } else {
      removeRivalPokemon(pokemon);
    }
    localStorage.setItem(
      "pokemonsTeamRival",
      JSON.stringify(pokemonSelectRival.value)
    );
  };

  watch(
    pokemonSelectRival,
    (pokemons) => {
      maxTeamRival.value = pokemons.length === maxSelectrival;
    },
    { deep: true }
  );

  const store: PokemonsPreferenceState = {
    isFavorite,
    isSelected,
    addFavoritoPokemon,
    addStorePokemon,
    deleteFavoritoPokemon,
    removeStorePokemon,
    pokemonSelect,
    maxTeam,
    pokemonsFavoritos,
    addRivalPokemon,
    isSelectedRival,
    pokemonSelectRival,
    removeRivalPokemon,
    maxTeamRival,
  };

  provide(PokemonKey, store);

  return store;
};
