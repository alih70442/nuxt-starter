<template>
  <el-dialog
    v-model="shown"
    :title="title"
    :width="width"
    :append-to-body="body"
    :fullscreen="fullscreen"
    :lock-scroll="true"
    :show-close="closeable"
    @closed="closed"
  >
    <template #default>
      <slot></slot>
    </template>
  </el-dialog>
</template>

<script setup>
const shown = defineModel('shown');

const emits = defineEmits(['closed']);
const props = defineProps({
  title: {
    type: String,
  },
  width: {
    type: Number,
    default: 500,
  },
  fullscreen: {
    type: Boolean,
  },
  closeable: {
    type: Boolean,
    default: true,
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

const closed = () => {
  emits('closed');
};

defineExpose({
  hide,
  show,
});
</script>

<style scoped></style>
