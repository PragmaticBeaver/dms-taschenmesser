<script setup lang="ts">
import { useMonsterStore, type MonsterListEntry } from "@/stores/monster";
import { onMounted, ref } from "vue";
import { API_URL } from "@/constants";
import MinionSearchInput from "./MinionSearchInput.vue";
import MinionBuilder from "./MinionBuilder.vue";
import type { MonsterDto } from "@/logic/monsterDto";

const monsterStore = useMonsterStore();
const selectedMonster = ref<MonsterDto>();

async function fillMonsterStore(): Promise<void> {
  const url = `${API_URL}/api/monsters`;
  const response = await fetch(url, { method: "get" });
  const data = (await response.json()) as {
    count: number;
    results: MonsterListEntry[];
  };
  monsterStore.addMonsters(data.results);
}

async function onSelectedMonster(index: string): Promise<void> {
  const monster = monsterStore.monsters.find((monster) => {
    return monster.index === index;
  });
  if (!monster) {
    return;
  }

  const url = `${API_URL}${monster.url}`;
  const response = await fetch(url, { method: "get" });
  const data = (await response.json()) as MonsterDto;
  selectedMonster.value = data;
}

onMounted(async () => {
  await fillMonsterStore();
});
</script>

<template>
  <h2>Generate Minion</h2>
  <MinionSearchInput
    :monsters="monsterStore.monsters"
    @select-monster="onSelectedMonster"
    v-if="!selectedMonster"
  />
  <MinionBuilder :monster="selectedMonster" v-else />
</template>

<style></style>
