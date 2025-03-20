<template>
  <el-popconfirm
    :title="title"
    :cancel-button-text="cancelButtonText"
    :confirm-button-text="confirmButtonText"
    :width="200"
    @cancel="cancel"
    @confirm="confirm"
  >
    <template #reference>
      <slot></slot>
    </template>
  </el-popconfirm>
</template>

<script setup>
const emits = defineEmits(['cancel', 'confirm']);
const props = defineProps({
  title: {
    type: String,
    default: 'آیا مطمئن هستید؟',
  },
  confirmButtonText: {
    type: String,
    default: 'مطمئنم',
  },
  cancelButtonText: {
    type: String,
    default: 'منصرف شدم',
  },
});

const cancel = () => {
  emits('cancel');
};

const confirm = () => {
  emits('confirm');
};
</script>

<style scoped></style>
