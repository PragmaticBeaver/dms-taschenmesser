export interface MonsterDto {
  index: string;
  name: string;
  size: string;
  type: string;
  alignment: string;
  armor_class: number;
  hit_points: number;
  hit_dice: string;
  hit_points_roll: string;
  speed: Speed;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  proficiencies: ProficiencyElement[];
  damage_vulnerabilities: any[];
  damage_resistances: any[];
  damage_immunities: string[];
  condition_immunities: any[];
  senses: Senses;
  languages: string;
  challenge_rating: number;
  xp: number;
  special_abilities: SpecialAbility[];
  actions: MonsterAction[];
  legendary_actions: Tion[];
  url: string;
}

export interface MonsterAction {
  name: string;
  multiattack_type?: string;
  desc: string;
  actions: ActionAction[];
  attack_bonus?: number;
  damage?: Damage[];
  dc?: Dc;
  usage?: ActionUsage;
  options?: Options;
}

export interface ActionAction {
  action_name: string;
  count: number;
  type: string;
}

export interface Damage {
  damage_type: PurpleProficiency;
  damage_dice: string;
}

export interface PurpleProficiency {
  index: string;
  name: string;
  url: string;
}

export interface Dc {
  dc_type: PurpleProficiency;
  dc_value: number;
  success_type: string;
}

export interface Options {
  choose: number;
  type: string;
  from: From;
}

export interface From {
  option_set_type: string;
  options: Tion[];
}

export interface Tion {
  option_type?: string;
  name: string;
  dc?: Dc;
  damage?: Damage[];
  desc?: string;
}

export interface ActionUsage {
  type: string;
  dice: string;
  min_value: number;
}

export interface ProficiencyElement {
  value: number;
  proficiency: PurpleProficiency;
}

export interface Senses {
  blindsight: string;
  darkvision: string;
  passive_perception: number;
}

export interface SpecialAbility {
  name: string;
  desc: string;
  usage: SpecialAbilityUsage;
  spellcasting?: Spellcasting;
}

export interface Spellcasting {
  level: number;
  ability: PurpleProficiency;
  dc: number;
  modifier: number;
  components_required: string[];
  school: string;
  slots: { [key: string]: number };
  spells: Spell[];
}

export interface Spell {
  name: string;
  level: number;
  url: string;
  usage?: Usage;
  notes?: string;
}

export interface Usage {
  rest_types: any[];
  type: string;
}

export interface SpecialAbilityUsage {
  rest_types: any[];
  type: string;
  times: number;
}

export interface Speed {
  walk: string;
  climb: string;
  fly: string;
  burrow: string;
  swim: string;
}
