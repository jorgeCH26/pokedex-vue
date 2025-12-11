interface PokemonStats {
  name: string;
  hpLeft: number;
  status: string;
  movesUsed: string[];
  image: string;
}

export interface BattleData {
  winner: string;
  battleNarration: string;
  battleDuration: number;
  myTeamStats: PokemonStats[];
  rivalTeamStats: PokemonStats[];
}
