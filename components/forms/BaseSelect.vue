<template>
  <div>
    <div class="d-flex mb-2" v-if="input.label">
      <label :for="input_id" class="mb-0">
        {{ input.label }}
        <span class="text-danger" v-if="is_required">
          *
        </span>
      </label>
      <slot name="hint" class="mb-2"></slot>
    </div>
    <div :class="{'p-loading p-loading--left p-loading--bgWhite': input.loading}">
      <select
        class="form-control"
        :class="{'has-error': errors.length}"
        :name="name"
        v-bind="input.attrs"
        :id="input_id"
        :disabled="disabled"
        :value="input.value"
        @input="onInput($event)"
        @blur="handleBlur"
      >
        <template v-if="input.options.length">
          <option
            :value="option.id"
            :disabled="option.disabled"
            :selected="option.checked"
            v-for="option of input.options"
            :key="option.id"
          >
            {{ option.title }}
          </option>
        </template>
        <template v-else>
          <option value="" disabled selected>در حال بارگیری ...</option>
        </template>
      </select>
    </div>
    <p class="t-12 text-muted mt-1" v-if="input.helpText">{{ input.helpText }}</p>
    <p class="d-block text-danger t-12 ml-1 mt-1" v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
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
  handleChange(event, true);
  const input_val = event.target.value?.toString();
  emits("update:modelValue", input_val);
  if (props.input.onChange)
    props.input.onChange();
  props.onChange(input_val);
};

const reset = () => {
  emits("update:modelValue", "");
  resetField();
};

defineExpose({
  reset,
});
</script>

<style scoped lang="scss">
</style>
