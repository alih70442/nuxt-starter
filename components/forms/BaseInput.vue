<template>
  <div class="c-input" :class="{'has-prefix': input.inputPrefix || prefix}">
    <div class="d-flex mb-2" v-if="input.label">
      {{ input.label }}
      <span class="text-danger" v-if="is_required">
        *
      </span>
      <slot name="hint" class="mb-2"></slot>
    </div>
    <div class="input-group position-relative" :class="{'p-loading p-loading--left p-loading--bgWhite': input.loading}">
      <input
        :name="name"
        type="text"
        v-bind="input.attrs"
        class="c-input__input form-control"
        :class="{'has-error': errors.length}"
        :id="input_id"
        :value="modelValue"
        :disabled="disabled"
        :placeholder="input.placeholder"
        @input="onInput($event)"
        @change="onChange"
        ref="refInput"
      />
      <span v-if="input.inputPrefix || prefix" class="c-input__prefix">{{ input.inputPrefix ?? prefix }}</span>
    </div>
    <p class="text-danger t-12 ml-1 mt-1" v-show="!empty(errorMessage)">{{ errorMessage }}</p>
    <p class="t-12 text-muted mt-1" v-html="helpText" v-if="helpText"></p>
    <p class="t-12 text-muted mt-1" v-html="input.helpText" v-if="input.helpText"></p>
  </div>
</template>

<script setup>
import { ref } from "vue";
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
  helpText: {
    type: String,
  },
  prefix: {
    type: String,
  },
  translators: {
    type: Array,
    default: [],
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
  inputValue,
  modelValue,
  is_required,
  input_id,
  name,
  reset,
} = useInput(props, emits);

const onInput = (event) => {
  handleChange(event, true);
  let input_value = event.target.value;
  for (const translator of props.translators)
    input_value = translator(input_value);
  inputValue.value = input_value;
  emits("update:modelValue", input_value);
};

const refInput = ref(null);
const get_input = () => {
  return refInput.value;
};

const focus = () => {
  setTimeout(() => {
    refInput.value.focus();
  });
};

defineExpose({
  get_input,
  focus,
  reset,
});
</script>

<style scoped lang="scss">

.c-input {
  $parent: #{&};

  @at-root  #{$parent}__input {
  }

  @at-root  #{$parent}__prefix {
    @extend %centering;

    position: absolute;
    left: 4px;
    top: 50%;
    transform: translateY(-50%);

    height: calc(100% - 8px);
    padding: 0 8px;

    background: #D9D9D9;
    border-radius: 8px;
    color: black;
    z-index: 3;
  }

  &.has-prefix {
    #{$parent}__input {
      padding-left: 48px;
    }
  }
}

</style>
