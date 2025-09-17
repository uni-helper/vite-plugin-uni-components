<script setup lang="ts">
interface Data {
  label: string
  children?: Data[]
}

defineProps<{
  data: Data
}>()
</script>

<template>
  <div>
    <div>{{ data.label }}</div>
    <div class="child">
      <recursive v-for="(item, idx) in data.children" :key="idx" :data="item" />
    </div>
  </div>
</template>

<style>
.child {
  margin-left: 2rem;
}
</style>
