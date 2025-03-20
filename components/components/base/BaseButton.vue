<template>
  <el-button
    :type="type"
    :size="size"
    :loading="loading"
    :tag="tag"
    :native-type="nativeType"
    :disabled="disabled"
    :text="text"
    :plain="plain"
    :round="round"
    :circle="circle"
  >
    <slot></slot>
  </el-button>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
  },
  tag: {
    type: String,
    default: 'button',
  },
  size: {
    type: String,
  },
  loading: {
    type: Boolean,
  },
  nativeType: {
    type: String,
    default: 'button',
  },
  disabled: {
    type: Boolean,
  },
  text: {
    type: Boolean,
  },
  plain: {
    type: Boolean,
  },
  round: {
    type: Boolean,
  },
  circle: {
    type: Boolean,
  },
});
</script>

<style scoped></style>
