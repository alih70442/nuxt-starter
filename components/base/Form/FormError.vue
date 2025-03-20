<template>
  <p class="c-input__errorText" v-if="errorText">
    {{ errorText }}
  </p>

  <p class="c-input__helpText" v-html="helpText"></p>
</template>

<script setup>
const props = defineProps({
  errorText: {
    type: String,
    default: "",
  },
  helpText: {
    type: String,
    default: "",
  },
});
</script>

<style scoped lang="scss">
.c-input__errorText {
  color: $color-danger;
  font-size: 13px;
  margin-top: 4px;

  &:empty {
    display: none;
  }
}

.c-input__helpText {
  color: $color-neutral-400;
  font-size: 13px;
  margin-top: 4px;

  &:empty {
    display: none;
  }
}
</style>
