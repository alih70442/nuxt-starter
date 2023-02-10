<template>
  <div>
    <label :for="input_id" v-if="input.label">
      {{ input.label }}
      <span class="text-danger" v-if="is_required">
        *
      </span>
    </label>
    <textarea
      :name="name"
      v-bind="input.attrs"
      class="form-control"
      :class="{'has-error': errors.length}"
      :id="input_id"
      :value="modelValue"
      :disabled="disabled"
      @input="onInput($event)"
      @change="handleChange"
      @blur="handleBlur"
    ></textarea>
    <p class="t-12 text-muted mt-1" v-if="input.helpText">{{ input.helpText }}</p>
    <p class="d-block text-danger t-12 ml-1 mt-1" v-show="!empty(errorMessage)">{{ errorMessage }}</p>
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
    type: [String, Number],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const {
  errorMessage,
  errors,
  handleChange,
  resetField,
  inputValue,
  modelValue,
  is_required,
  handleBlur,
  input_id,
  name,
  reset,
} = useInput(props, emits);


const onInput = (event) => {
  handleChange(event, true);
  emits("update:modelValue", event.target.value);
};


</script>
