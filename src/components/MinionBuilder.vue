<script setup lang="ts">
import type { MinionConversionDto, MinionDto } from "@/logic/minionDto";
import type { MonsterDto } from "@/logic/monsterDto";
import { onMounted, ref } from "vue";
import conversionTable from "@/assets/MinionStatsByCR.json";

const props = defineProps<{ monster: MonsterDto }>();
const minion = ref<MinionDto>();

function convertMonster(monster: MonsterDto): void {
  const conversion = (conversionTable as Record<string, MinionConversionDto>)[
    monster.challenge_rating
  ];

  const partialXp = monster.xp / 5;
  const xp = partialXp < 0 ? 0 : partialXp;

  minion.value = {
    armorClass: monster.armor_class,
    attributes: {
      STR: monster.strength,
      DEX: monster.dexterity,
      CON: monster.constitution,
      INT: monster.intelligence,
      WIS: monster.wisdom,
      CHA: monster.charisma,
    },
    alignment: monster.alignment,
    challengeRating: monster.challenge_rating,
    damage: conversion.damage,
    hitPoints: conversion.hitPoints,
    name: `${monster.name} Minion`,
    proficiencyBonus: conversion.profBonus,
    size: monster.size,
    speed: monster.speed,
    type: monster.type,
    xp,
  };
}

onMounted(() => convertMonster(props.monster));
</script>

<template>
  <div>
    <h2>Base monster</h2>
    <p>{{ props.monster.name }}</p>
  </div>

  <div v-if="minion">
    <!-- Header left -->
    <div>
      <div>
        <b>Name</b>
        <p>{{ minion.name }}</p>
      </div>

      <div>
        <b>Size</b>
        <p>{{ minion.size }}</p>
      </div>

      <div>
        <b>Type</b>
        <p>{{ minion.type }}</p>
      </div>

      <div>
        <b>Alignment</b>
        <p>{{ minion.alignment }}</p>
      </div>
    </div>

    <!-- Header right -->
    <div>
      <div>
        <b>CR</b>
        <p>{{ minion.challengeRating }} Minion</p>
        <b>XP</b>
        <p>{{ minion.xp }}</p>
      </div>
    </div>

    <!-- Base stats -->
    <div>
      <b>Armor Class</b>
      <p>{{ minion.armorClass }}</p>
    </div>

    <div>
      <b>Hit Points</b>
      <p>{{ minion.hitPoints }}</p>
    </div>

    <div>
      <b>Speed</b>
      <p>{{ minion.speed }}</p>
    </div>

    <!-- Attributes -->
    <div>
      <b>Attributes</b>
      <p>{{ minion.attributes }}</p>
    </div>

    <!--  -->
    <div>
      <b>Damage</b>
      <p>{{ minion.damage }}</p>
    </div>

    <div>
      <b>Proficiency Bonus</b>
      <p>{{ minion.proficiencyBonus }}</p>
    </div>
  </div>

  <div v-else>
    <p>Loading ...</p>
  </div>
</template>

<style></style>
