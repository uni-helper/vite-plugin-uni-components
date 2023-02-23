<script setup lang='ts'>
import { ref } from 'vue'

const tree = ref({
  label: 'Top Level',
  children: [
    { label: 'First Level' },
    { label: 'First Level', children: [{ label: 'Second Level' }] },
  ],
})
</script>

<template>
  <div class="block">
    <h1>Basic (4)</h1>
    <ComponentA msg="a" />
    <component-b msg="b" />
    <ComponentC msg="c" />
    <ComponentD />
    <h3>Recursive Components</h3>
    <recursive :data="tree" />
  </div>

  <div class="block">
    <h1>Ano UI (2)</h1>
    <AButton>Button</AButton>
  </div>
</template>

<style scoped>
.block {
  padding: 0px 20px 10px 20px;
  margin: 20px 20px;
  border: 1px solid #888;
  border-radius: 5px;
}
</style>
