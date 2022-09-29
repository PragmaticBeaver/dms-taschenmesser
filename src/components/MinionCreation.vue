<script setup lang="ts">
import { useMonsterStore, type MonsterListEntry } from "@/stores/monster";
import { onMounted, ref } from "vue";
import { API_URL } from "@/constants";
import { useArrayFilter } from "@vueuse/core";

const monsterStore = useMonsterStore();
const searchCriteria = ref("");

const filteredMonsters = useArrayFilter(monsterStore.monsters, (monster) => {
  const monstername = monster.name.toLocaleLowerCase().trim();
  const criteria = searchCriteria.value.toLocaleLowerCase().trim();
  return monstername.includes(criteria);
});

async function fillMonsterStore() {
  const url = `${API_URL}/monsters`;
  const response = await fetch(url, { method: "get" });
  const data = (await response.json()) as {
    count: number;
    results: MonsterListEntry[];
  };
  monsterStore.addMonsters(data.results);
}

onMounted(async () => {
  // todo extract from view layer into logic layer
  await fillMonsterStore();
});
</script>

<template>
  <h2>Generate Minion</h2>
  <div>
    <input
      type="text"
      v-model="searchCriteria"
      placeholder="Search monster ..."
    />
    <div v-for="monster in filteredMonsters" :key="monster.index">
      {{ monster.name }}
    </div>
    <div v-if="searchCriteria && !filteredMonsters.length">
      <p>No monsters found! 😨</p>
    </div>
  </div>
</template>

<style></style>
