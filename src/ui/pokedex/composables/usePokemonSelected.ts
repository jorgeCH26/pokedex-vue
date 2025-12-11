import {  inject } from "vue";
import type { Store } from "../../../domain/store/store";

export const usePokemonSelectedTeam = () => {
  const store = inject<Store>("store");

  if (!store) {
    throw new Error("Store no encontrado. Asegúrate de proporcionar el store en el componente padre.");
  }

  const {
    isFavorite,
    isSelected,
    addFavoritoPokemon,
    addStorePokemon,
    deleteFavoritoPokemon,
    removeStorePokemon,
    pokemonSelect: pokemonSelectedStore,
    maxTeam,
    pokemonsFavoritos,
    addRivalPokemon,
    isSelectedRival,
    maxTeamRival,
    pokemonSelectRival,
    removeRivalPokemon
  } = store.pokemonPreferences;

  return {
    isFavorite,
    isSelected,
    addFavoritoPokemon,
    addStorePokemon,
    deleteFavoritoPokemon,
    removeStorePokemon,
    pokemonSelectedStore,
    maxTeam,
    pokemonsFavoritos,
    addRivalPokemon,
    isSelectedRival,
    maxTeamRival,
    pokemonSelectRival,
    removeRivalPokemon
  };
};
