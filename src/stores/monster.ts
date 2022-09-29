import { ref } from "vue";
import { defineStore } from "pinia";

export interface MonsterListEntry {
  index: string;
  name: string;
  url: string;
}

export const useMonsterStore = defineStore("monster", () => {
  const monsters = ref<MonsterListEntry[]>([]);

  function addMonsters(monsters: MonsterListEntry[]) {
    monsters.forEach((monster) => {
      addMonster(monster);
    });
  }

  function addMonster(monster: MonsterListEntry) {
    const isKnown = monsters.value.findIndex((val) => {
      return val.index === monster.index;
    });
    if (isKnown > -1) {
      return;
    }
    monsters.value.push(monster);
  }

  return { monsters, addMonsters };
});
