import type { BattleData } from "../interface/api/gpt-rest.interface";

export class PokemonsGptMappers {
  static pokemonToRest(pokemon: BattleData): BattleData {
    return {
      winner: pokemon.winner,
      battleNarration: pokemon.battleNarration,
      battleDuration: pokemon.battleDuration,
      myTeamStats: pokemon.myTeamStats.map((p) => ({ ...p })),
      rivalTeamStats: pokemon.rivalTeamStats.map((p) => ({ ...p })),
    };
  }
}
