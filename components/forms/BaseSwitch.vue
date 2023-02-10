<template>
  <div>
    <div class="c-switch" :class="{'has-error': errors.length}">
      <input
        :name="name"
        v-bind="input.attrs"
        type="checkbox"
        class="c-switch__input"
        :id="input_id"
        :checked="modelValue"
        @input="onInput($event)"
        :disabled="input.disabled"
      >
      <label :for="input_id" class="c-switch__label"></label>
    </div>
    <p class="t-12 text-muted mt-1" v-if="input.helpText">{{ input.helpText }}</p>
    <p class="text-danger t-12 ml-1 mt-1" v-show="!empty(errorMessage)">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import empty from "@/assets/js/functions/empty";
import useInput from "@/assets/js/composables/form/useInput";

const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
  input: {
    required: true,
  },
  modelValue: {
    type: [Boolean, Number],
    default: false,
  },
  onChange: {
    type: Function,
    default: () => {
    },
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
  input_id,
  name,
} = useInput(props, emits);

const onInput = (event) => {
  const input_value = event.target.checked;
  emits("update:modelValue", input_value);
  props.onChange(input_value);
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
