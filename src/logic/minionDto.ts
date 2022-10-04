import type { Speed } from "./monsterDto";

export interface MinionDto {
  /**
   * Minion requirements;
   * -
   * Hit Points
   * they have no Hit Dice and cant heal
   * if they take damage from an attack or by failing a save, they die
   * -
   * Minion. If the minion takes damage from an attack or as the result of a failed saving throw, their hit points are reduced to 0. If the minion takes damage from another effect, they die if the damage equals or exceeds their hit point maximum, otherwise they take no damage.
   */
  armorClass: number;
  attributes: {
    STR: number;
    DEX: number;
    CON: number;
    INT: number;
    WIS: number;
    CHA: number;
  };
  alignment: string;
  challengeRating: number;
  damage: number;
  hitPoints: number;
  name: string;
  proficiencyBonus: number;
  speed: Speed;
  size: string;
  type: string;
  xp: number;
}

export interface MinionConversionDto {
  profBonus: number;
  hitPoints: number;
  damage: number;
}
