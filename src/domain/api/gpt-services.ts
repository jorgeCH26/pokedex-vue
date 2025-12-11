import type { BattleData } from "../interface/api/gpt-rest.interface";
import type { Pokemon } from "../interface/ui/Pokemon.interface";
import { PokemonsGptMappers } from "../mappers/gpt.mappers";
import { gptApi } from "./gpt-api";

export const simulateFight = async (team1: Pokemon[], team2: Pokemon[]): Promise<BattleData> => {
  const payload = {
    myTeam: team1,
    rivalTeam: team2
  };

  const { data } = await gptApi.post<BattleData>('pokemon-battle', payload);

  const battleResult = PokemonsGptMappers.pokemonToRest(data);
  return battleResult;
};
