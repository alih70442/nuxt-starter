<template>
  <el-tab-pane
    :name="name"
    :label="label"
    :lazy="lazy"
  >
    <slot></slot>
  </el-tab-pane>
</template>

<script setup>
const emits = defineEmits([]);
const props = defineProps({
  name: {
    type: String,
  },
  label: {
    type: String,
  },
  lazy: {
    type: Boolean,
    default: true,
  },
});
</script>

<style scoped></style>
