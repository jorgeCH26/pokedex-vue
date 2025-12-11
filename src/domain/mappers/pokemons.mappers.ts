import type { PokemonREST } from "../interface/api";
import type { Pokemon } from "../interface/ui/Pokemon.interface";

export class PokemonsMappaers {
    static pokemonToRest(pokemon: PokemonREST):Pokemon {
        return {
            id: pokemon.id,
            imgUrl: pokemon.sprites.other?.["official-artwork"].front_default || pokemon.sprites.front_default,
            name: pokemon.name,
            types: pokemon.types.map(type => type.type.name),
            imgUrlGift: pokemon.sprites.other?.showdown.front_default,
            abilities: pokemon.abilities.map(ability => ability.ability.name),
            stats: pokemon.stats.map(stat => ({
                base_stat: stat.base_stat.toString(),
                name_stat: stat.stat.name
            }))
        }
    }
}