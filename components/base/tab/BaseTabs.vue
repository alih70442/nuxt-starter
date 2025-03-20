<template>
  <el-tabs
    v-model="model"
  >
    <slot></slot>
  </el-tabs>
</template>

<script setup>

const model = defineModel({
  required: true,
});

const emits = defineEmits([]);
const props = defineProps({});

</script>

<style scoped>

</style>