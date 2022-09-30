<script setup lang="ts">
const props = defineProps<{ name: string; index: string }>();
</script>

<template>
  <div @click="$emit('select-monster', props.index)">
    <p>{{ props.name }}</p>
  </div>
</template>

<style></style>
