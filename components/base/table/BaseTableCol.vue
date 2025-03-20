<template>
  <el-table-column
    :label="label"
    :prop="prop"
    :width="width"
    :type="type"
  >
    <template #header="passed">
      <slot name="header" v-bind="passed"></slot>
    </template>

    <template #default="passed">
      <slot name="default" v-bind="passed">
        {{ passed.row[prop] }}
      </slot>
    </template>
  </el-table-column>
</template>

<script setup>

const props = defineProps({
  label: {
    type: String,
  },
  prop: {
    type: String,
  },
  width: {
    type: Number,
  },
  type: {
    type: String,
  },
});

</script>

<style scoped>

</style>