<script setup lang="ts">
import type { MonsterListEntry } from "@/stores/monster";
import { useArrayFilter } from "@vueuse/shared";
import { computed, ref } from "vue";
import MinionSelectionButton from "./MinionSelectionButton.vue";

const props = defineProps<{ monsters: MonsterListEntry[] }>();
defineEmits<{ (e: "select-monster", index: string): void }>();

const searchCriteria = ref("");

const filteredMonsters = useArrayFilter(props.monsters, (monster) => {
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
</script>

<template>
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
      <MinionSelectionButton
        :name="monster.name"
        :index="monster.index"
        @select-monster="$emit('select-monster', $event)"
      />
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
