<template>
  <el-dropdown
    :placement="placement"
    :trigger="trigger"
  >
    <template #default="passed">
      <slot v-bind="passed"></slot>
    </template>

    <template #dropdown="passed">
      <el-dropdown-menu>
        <slot
          name="menu"
          v-bind="passed"
        ></slot>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
const emits = defineEmits(['select']);
const props = defineProps({
  placement: {
    type: String,
    default: 'bottom',
  },
  trigger: {
    type: String,
    default: 'click',
  },
});

const handleSelect = id => {
  props.options.find(o => o.id === id)?.callback();

  emits('select', id);
};
</script>

<style scoped></style>
