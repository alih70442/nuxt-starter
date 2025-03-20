<template>
  <form-label
    :label="input_label"
    :is-required="is_required"
  >
    <template #hint>
      <slot name="label-hint"></slot>
    </template>
  </form-label>

  <el-input
    v-model="model"
    :name="input_name"
    :placeholder="comp_placeholder"
    :maxlength="comp_maxlength"
    :inputmode="comp_inputmode"
    type="password"
    :size="comp_size"
    :disabled="disabled"
    show-password
  />

  <form-error
    :help-text="input_helpText"
    :error-text="comp_errorText"
  />
</template>

<script setup>
import FormLabel from '@/components/base/Form/FormLabel.vue';
import FormError from '@/components/base/Form/FormError.vue';
import useInputValidation from '@/assets/js/composables/form/useInputValidation.js';
import useInput from '@/assets/js/composables/form/useInput.js';
import { computed } from 'vue';

const model = defineModel({
  required: true,
});

const emits = defineEmits([]);
const props = defineProps({
  input: {
    type: Object,
  },
  label: {
    type: String,
  },
  size: {
    type: String,
  },
  placeholder: {
    type: String,
  },
  maxlength: {
    type: String,
  },
  inputmode: {
    type: String,
  },
  errorText: {
    type: String,
  },
  disabled: {
    type: Boolean,
  },
});

const {
  is_required,
  input_id,
  input_name,
  input_disabled,
  input_helpText,
  input_label,
  computed_prop,
} = useInput(props, emits);

const { errorMessage, errors, inputValue, modelValue, handleChange, handleBlur, resetField } =
  useInputValidation(input_name, props);

const comp_placeholder = computed_prop('placeholder', '');
const comp_maxlength = computed_prop('maxlength', null);
const comp_inputmode = computed_prop('inputmode', null);
const comp_size = computed_prop('size', null);
const comp_errorText = computed(
  () => props.errorText || props.input.errorText || errorMessage.value
);
</script>

<style scoped></style>
