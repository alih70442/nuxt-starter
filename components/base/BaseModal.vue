<template>
  <el-dialog
    v-model="shown"
    :title="title"
    width="500"
    :append-to-body="body"
  >
    <template #default>
      <slot></slot>
    </template>
  </el-dialog>
</template>

<script setup>

const shown = defineModel("show");

const props = defineProps({
  shown: {
    type: String,
    default: "primary",
  },
  title: {
    type: String,
  },
  width: {
    type: Number,
  },
  body: {
    type: Boolean,
    default: true,
  },
});

const hide = () => {
  shown.value = false;
};

const show = () => {
  shown.value = true;
};

defineExpose({
  hide,
  show,
});
</script>

<style scoped>

</style>