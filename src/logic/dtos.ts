interface MinionStats {
  profBonus: number;
  hitPoints: number;
  damage: number;
}

export type MinionStatsByCR = Record<string, MinionStats>;
