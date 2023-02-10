<template>
  <div>
    <div class="c-checkbox">
      <input
        :name="name"
        v-bind="input.attrs"
        type="checkbox"
        class="c-checkbox__input"
        :id="input_id"
        :checked="modelValue"
        @input="onInput($event)"
        @change="handleChange"
        @blur="handleBlur"
        style="position: relative; top: 4px;"
      >
      <label :for="input_id" class="c-checkbox__label">{{ input.label }}</label>
      <slot name="label"></slot>
    </div>
    <p class="t-12 text-muted mt-1" v-if="input.helpText">{{ input.helpText }}</p>
    <p class="text-danger t-12 ml-1 mt-1" v-show="!empty(errorMessage)">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import empty from "@/assets/js/functions/empty";
import useInput from "@/assets/js/composables/form/useInput";

const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
  input: {
    required: true,
  },
  modelValue: {
    type: [Boolean],
    default: false,
  },
  onChange: {
    type: Function,
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

const reset = () => {
  emits("update:modelValue", false);
  inputValue.value = false;
  resetField();
};

const onInput = (event) => {
  const input_value = event.target.checked;
  handleChange(event, true);
  emits("update:modelValue", input_value);
  props.onChange(input_value);
};

onMounted(() => {
  if (empty(props.modelValue))
    reset();
  else
    inputValue.value = props.modelValue;
});

defineExpose({
  reset,
});
</script>
