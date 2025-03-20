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

    <el-tree-select
      v-model="model"
      :name="input_name"
      :data="comp_options"
      :placeholder="comp_placeholder"
      :size="comp_size"
      :disabled="comp_disabled"
      :filterable="comp_filterable"
      :clearable="comp_clearable"
      @change="onChange"
    />

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

const emits = defineEmits(['change']);
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
  options: {
    type: Array,
  },
  filterable: {
    type: [Boolean, null],
    default: null,
  },
  clearable: {
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
const comp_size = computed_prop('size', null);
const comp_disabled = computed_prop('disabled', null);
const comp_filterable = computed_prop('filterable', true);
const comp_clearable = computed_prop('clearable', false);
const comp_errorText = computed(
  () => props.errorText || props.input.errorText || errorMessage.value
);

const comp_options = computed(() => {
  const options = computed_prop('options', []);

  return mapOptions(options.value);
});

const mapOptions = items => {
  return items.map(o => ({
    value: o.id,
    label: o.title,
    children: o.list ? mapOptions(o.list) : [],
  }));
};

const onChange = value => {
  emits('change', value);
};
</script>

<style scoped></style>
