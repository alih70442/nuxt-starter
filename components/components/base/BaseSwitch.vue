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

    <el-switch
      v-model="model"
      :name="input_name"
      :disabled="comp_disabled"
      :loading="loading"
      :size="comp_size"
      :active-text="activeText"
      :inactive-text="inactiveText"
      :active-value="activeValue"
      :inactive-value="inactiveValue"
      :before-change="beforeChange"
      inline-prompt
    />

    <form-error
      :help-text="input_helpText"
      :error-text="comp_errorText"
    />
  </div>
</template>

<script setup>
import useInput from '@/assets/js/composables/form/useInput';
import useInputValidation from '@/assets/js/composables/form/useInputValidation';
import { computed } from 'vue';
import FormLabel from '@/components/base/Form/FormLabel.vue';
import FormError from '@/components/base/Form/FormError.vue';

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
  errorText: {
    type: String,
  },
  disabled: {
    type: Boolean,
  },
  activeText: {
    type: String,
  },
  inactiveText: {
    type: String,
  },
  activeValue: {},
  inactiveValue: {},
  loading: {
    type: Boolean,
  },
  beforeChange: {
    type: Function,
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

const comp_size = computed_prop('size', null);
const comp_disabled = computed_prop('disabled', null);
const comp_errorText = computed(
  () => props.errorText || props.input.errorText || errorMessage.value
);
</script>

<style scoped></style>
