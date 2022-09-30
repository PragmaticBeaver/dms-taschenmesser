<script setup lang="ts">
import { useMonsterStore, type MonsterListEntry } from "@/stores/monster";
import { onMounted, ref } from "vue";
import { API_URL } from "@/constants";
import MinionSearchInput from "./MinionSearchInput.vue";
import MinionBuilder from "./MinionBuilder.vue";

const monsterStore = useMonsterStore();
const selectedMonsterIdx = ref("");

async function fillMonsterStore(): Promise<void> {
  const url = `${API_URL}/monsters`;
  const response = await fetch(url, { method: "get" });
  const data = (await response.json()) as {
    count: number;
    results: MonsterListEntry[];
  };
  monsterStore.addMonsters(data.results);
}

function onSelectedMonster(index: string): void {
  selectedMonsterIdx.value = index;
}

onMounted(async () => {
  // todo extract from view layer into logic layer
  await fillMonsterStore();
});
</script>

<template>
  <h2>Generate Minion</h2>
  <MinionSearchInput
    :monsters="monsterStore.monsters"
    @select-monster="onSelectedMonster"
    v-if="!selectedMonsterIdx"
  />
  <MinionBuilder v-else />
</template>

<style></style>
