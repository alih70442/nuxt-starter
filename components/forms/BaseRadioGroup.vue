<template>
  <div class="d-flex flex-column">
    <p class="mb-2">
      {{ label }}
    </p>
    <base-radio
      :name="name"
      :rules="rules"
      :label="option.title"
      :value="option.id"
      :disabled="option.disabled"
      :model-value="modelValue"
      @select="select"

      v-for="option in options"
      :key="option.title"
    />
    <p class="text-danger t-12 ml-1 mt-1" v-show="!empty(errorMessage)">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import empty from "@/assets/js/functions/empty";
import useInput from "@/assets/js/composables/form/useInput";

const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    required: true,
  },
  label: {
    type: String,
  },
  name: {
    required: true,
    type: String,
  },
  options: {
    required: true,
    type: Array,
  },
  rules: {
    type: String,
  },
});

const {
  errorMessage,
  errors,
  handleChange,
  resetField,
  handleBlur,
  inputValue,
  modelValue,
  is_required,
  name,
} = useInput(props, emits);

const select = (value) => {
  inputValue.value = value?.toString();
  emits("update:modelValue", value);
};

const reset = () => {
  emits("update:modelValue", false);
  inputValue.value = false;
  resetField();
};

defineExpose({
  reset,
});
</script>
