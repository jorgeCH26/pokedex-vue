import type { PokemonList, PokemonREST } from "../interface/api";
import { PokemonsMappaers } from "../mappers/pokemons.mappers";
import { pokemonApi } from "./pokemon-api";

export const getPokemons = async (offset: number , limit: number) => {
  const { data } = await pokemonApi.get<PokemonList>(
    `/pokemon?limit=${limit}&offset=${offset}`
  );

  const pokemonRest = Promise.all(
    data.results.map(async (pekemon) => {
      const { data } = await pokemonApi.get<PokemonREST>(pekemon.url);

      const pokemons = PokemonsMappaers.pokemonToRest(data);
      return pokemons;
    })
  );
  return pokemonRest;
};

export const getPokemonById = async (id: number) => {
  const { data } = await pokemonApi.get<PokemonREST>(`/pokemon/${id}`);

  const pokemons = PokemonsMappaers.pokemonToRest(data);
  return pokemons;
};
