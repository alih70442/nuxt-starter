<template>
  <div class="c-input__label" v-if="label">
    {{ label }}

    <span class="c-input__required" v-if="isRequired">*</span>&nbsp;

    <slot name="hint"></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
  },
  isRequired: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped lang="scss">
.c-input__label {
  font-size: 14px;
  margin-bottom: 4px;
}
</style>
