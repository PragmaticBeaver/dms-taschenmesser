<script setup lang="ts">
import { useMonsterStore, type MonsterListEntry } from "@/stores/monster";
import { computed, onMounted, ref } from "vue";
import { API_URL } from "@/constants";
import { useArrayFilter } from "@vueuse/core";

const monsterStore = useMonsterStore();
const searchCriteria = ref("");

const filteredMonsters = useArrayFilter(monsterStore.monsters, (monster) => {
  const monstername = monster.name.toLocaleLowerCase().trim();
  const criteria = searchCriteria.value.toLocaleLowerCase().trim();
  return monstername.includes(criteria);
});

const monsterLimit = 15;
const limitedMonsters = computed(() => {
  const monsters: MonsterListEntry[] = [];
  for (let i = 0; i < filteredMonsters.value.length; i++) {
    if (i >= monsterLimit) {
      break;
    }
    const monster = filteredMonsters.value[i];
    monsters.push(monster);
  }
  return monsters;
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
  <div class="monster-selector">
    <input
      type="text"
      v-model="searchCriteria"
      placeholder="Search monster ..."
      class="monster-selector-input"
    />
    <div
      class="monster-selector-preview"
      v-for="monster in limitedMonsters"
      :key="monster.index"
    >
      {{ monster.name }}
    </div>
    <div
      class="monster-selector-error"
      v-if="searchCriteria && !limitedMonsters.length"
    >
      <p>No monsters found! 😨</p>
    </div>
    <div v-else>
      <p>...</p>
    </div>
  </div>
</template>

<style></style>
