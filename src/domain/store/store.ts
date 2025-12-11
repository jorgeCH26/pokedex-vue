import type { App } from "vue";
import { providePokemonStore } from "./counter/pokemon.store";
import { providePokemonPreferenceStore } from "./pokemon-preference/pokemon-preference.store";
import { provideAuthStore } from "./auth/pokemon.auth.store";

export type Store = {
  pokemon: ReturnType<typeof providePokemonStore>;
  pokemonPreferences: ReturnType<typeof providePokemonPreferenceStore>;
  authStore: ReturnType<typeof provideAuthStore>;
};

export const initialStore = (app: App) => {
  const pokemonStore = providePokemonStore();
  const pokemonStorePreferences = providePokemonPreferenceStore();
  const pokemonAuthStore = provideAuthStore();

  const store: Store = {
    pokemon: pokemonStore,
    pokemonPreferences: pokemonStorePreferences,
    authStore: pokemonAuthStore,
  };

  app.provide("store", store);
  return store;
};
