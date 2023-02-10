<template>
  <div class="d-flex align-items-center form-control px-1">
    <button type="button" class="icon2-add p-link text-muted p-2" @click="increment_value"></button>

    <input
      type="text"
      class="w-12 form-control border-solid bg-transparent text-xl text-center px-0"
      :value="modelValue"
      @change="change_value"
    >

    <button type="button" class="icon2-minus p-link text-muted p-2" @click="decrement_value"></button>
  </div>
</template>

<script setup>
import text_to_numbers from "@/assets/js/translators/text_to_numbers.translators";

const emits = defineEmits(["update:modelValue", "change"]);
const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  min: {
    type: Number,
    default: Number.NEGATIVE_INFINITY,
  },
  max: {
    type: Number,
    default: Number.POSITIVE_INFINITY,
  },
});

const decrement_value = () => {
  if (props.min >= props.modelValue) return;

  const new_value = props.modelValue - 1;

  emits("update:modelValue", new_value);
  emits("change", new_value);
};

const change_value = ($event) => {
  const inputValue = +text_to_numbers($event.target.value);

  if (props.min >= inputValue) {
    $event.target.value = +props.min;
    emits("update:modelValue", +props.min);
    emits("change", inputValue);

  } else if (props.max <= inputValue) {
    $event.target.value = +props.max;
    emits("update:modelValue", +props.max);
    emits("change", inputValue);

  } else {
    $event.target.value = inputValue;
    emits("update:modelValue", inputValue);
    emits("change", inputValue);
  }
};

const increment_value = () => {
  if (props.max <= props.modelValue) {
    return;
  }

  const new_value = props.modelValue + 1;

  emits("update:modelValue", new_value);
  emits("change", new_value);
};
</script>

<style scoped lang="scss">

</style>
