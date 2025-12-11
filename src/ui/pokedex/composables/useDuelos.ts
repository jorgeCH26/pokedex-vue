import { ref } from "vue";
import type { Pokemon } from "../../../domain/interface/ui/Pokemon.interface";
import { simulateFight } from "../../../domain/api/gpt-services";
import type { TeamsPokemon } from "../../../domain/interface/ui/Gpt.interface";

export const useGptAxios = (team1: Pokemon[], team2: Pokemon[]) => {
  const isLoading = ref(false);

  const team1_data = ref<TeamsPokemon[]>([]);
  const team2_data = ref<TeamsPokemon[]>([]);
  const battleNarration = ref<string[]>([]);
  const battleDuration = ref<number>(0);
  const winner = ref<string | null>(null);

  const simulateDuelo = async () => {
    isLoading.value = true;
    try {
      const pokemonRest = await simulateFight(team1, team2);

      team1_data.value = pokemonRest.myTeamStats;
      team2_data.value = pokemonRest.rivalTeamStats; // <- Corregido aquí
      battleNarration.value = pokemonRest.battleNarration.split('\n');
      battleDuration.value = pokemonRest.battleDuration;
      winner.value = pokemonRest.winner;

    } catch (err) {
      console.error("Error loading pokemons:", err);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    simulateDuelo,
    team1_data,
    team2_data,
    isLoading,
    battleDuration,
    battleNarration,
    winner
  }
};
