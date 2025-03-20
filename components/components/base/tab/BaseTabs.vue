<template>
  <el-tabs
    v-model="model"
    @tab-change="onTabChanged"
  >
    <slot></slot>
  </el-tabs>
</template>

<script setup>
const model = defineModel({
  required: true,
});

const emits = defineEmits(['changed']);
const props = defineProps({});

const onTabChanged = name => {
  emits('changed', name);
};
</script>

<style scoped></style>
