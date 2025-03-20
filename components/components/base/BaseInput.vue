<template>
  <div>
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
      :type="comp_type"
      :size="comp_size"
      :disabled="comp_disabled"
      :autosize="comp_autosize"
      :clearable="comp_clearable"
      :min="comp_min"
      :max="comp_max"
      :rows="comp_rows"
    >
      <template
        #prepend
        v-if="comp_prepend"
      >
        {{ comp_prepend }}
      </template>

      <template
        #append
        v-if="comp_append"
      >
        {{ comp_append }}
      </template>
    </el-input>

    <form-error
      :help-text="input_helpText"
      :error-text="comp_errorText"
    />
  </div>
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
  type: {
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
  autosize: {
    type: Boolean,
  },
  rows: {
    type: Number,
  },
  clearable: {
    type: Boolean,
  },
  prepend: {
    type: String,
  },
  append: {
    type: String,
  },
  min: {
    type: Number,
  },
  max: {
    type: Number,
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
const comp_type = computed_prop('type', 'text');
const comp_disabled = computed_prop('disabled', null);
const comp_autosize = computed_prop('autosize', null);
const comp_rows = computed_prop('rows', null);
const comp_prepend = computed_prop('prepend', null);
const comp_append = computed_prop('append', null);
const comp_clearable = computed_prop('clearable', false);
const comp_min = computed_prop('min', null);
const comp_max = computed_prop('max', null);
const comp_errorText = computed(
  () => props.errorText || props.input.errorText || errorMessage.value
);
</script>

<style scoped></style>
