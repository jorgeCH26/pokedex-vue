import type { Ref } from "vue";
import type { Pokemon } from "../../interface/ui/Pokemon.interface";


export type PokemonsPreferenceState = {
    pokemonsFavoritos:Ref<Pokemon[]>;
    pokemonSelect:Ref<Pokemon[]>;
    pokemonSelectRival:Ref<Pokemon[]>;
    maxTeam:Ref<Boolean>;
    maxTeamRival:Ref<Boolean>;
    isFavorite:(pokemon:Pokemon) => boolean;
    isSelected:(pokemon:Pokemon) => boolean;
    isSelectedRival:(pokemon:Pokemon) => boolean;
    addFavoritoPokemon: (pokemon: Pokemon) => void;
    deleteFavoritoPokemon: (pokemon: Pokemon) => void;
    addStorePokemon: (pokemon: Pokemon) => void;
    addRivalPokemon: (pokemon: Pokemon) => void;
    removeStorePokemon: (pokemon: Pokemon) => void;
    removeRivalPokemon: (pokemon: Pokemon) => void;
   
}
