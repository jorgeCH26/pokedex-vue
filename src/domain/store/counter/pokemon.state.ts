import type { Ref } from "vue";
import type { Pokemon } from "../../interface/ui/Pokemon.interface";


export type PokemonState = {
    pokemons:Ref<Pokemon[]>;
    loadPokemons:() => void;
    isLoading:Ref<Boolean>;
    nextPage: () => void;
    previousPage:() => void;
    offsetValue:Ref<Number>;
    setInitialValue: (int: number) => void;
    loadPokemonById: (id: number) => void;
    pokemonSelect:Ref<Pokemon | null>;
    setLimitPokemons: (limit: number) => void;
}
