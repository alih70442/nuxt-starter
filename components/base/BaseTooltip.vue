<template>
  <el-tooltip
    effect="dark"
    :content="content"
    :placement="placement"
  >
    <template #content>
      <slot name="content"></slot>
    </template>

    <slot></slot>
  </el-tooltip>
</template>

<script setup>

const emits = defineEmits(["cancel", "confirm"]);
const props = defineProps({
  content: {
    type: String,
  },
  placement: {
    type: String,
    default: "top",
  },
});

</script>

<style scoped>

</style>