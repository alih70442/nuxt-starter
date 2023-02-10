<template>
  <div class="c-input" :class="{'has-prefix': input.inputPrefix}">
    <label :for="input_id" v-show="input.label">
      {{ input.label }}
      <span class="text-danger" v-if="is_required">
        *
      </span>
    </label>
    <div class="input-group position-relative" :class="{'p-loading p-loading--left p-loading--bgWhite': input.loading}">
      <input
        :name="name"
        :type="input_type"
        v-bind="input.attrs"
        class="c-input__input form-control pr-5"
        :class="{'has-error': errors.length}"
        :id="input_id"
        :value="input.value"
        @input="onInput($event)"
        @change="handleChange"
        @blur="handleBlur"
        ref="refInput"
      />
      <button
        type="button"
        tabindex="-1"
        class="btn position-absolute right-0 top-0 z-10"
        :class="[input_type === 'password' ? 'icon2-eye' : 'icon2-eye-slash']"
        @click="toggle_visibility"
      ></button>
    </div>
    <p class="t-12 text-muted mt-1" v-if="helpText">{{ helpText }}</p>
    <p class="t-12 text-muted mt-1" v-if="input.helpText">{{ input.helpText }}</p>
    <p class="text-danger t-12 ml-1 mt-1" v-show="!empty(errorMessage)">{{ errorMessage }}</p>
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
  helpText: {
    type: String,
  },
  translators: {
    type: Array,
    default: [],
  },
});

const input_type = ref("password");

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
  let input_value = event.target.value;
  for (const translator of props.translators)
    input_value = translator(input_value);
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

const toggle_visibility = () => {
  if (input_type.value === "password")
    input_type.value = "text";
  else
    input_type.value = "password";
};

defineExpose({
  reset,
  get_input,
  focus,
});
</script>

<style scoped lang="scss">

.c-input {
  $parent: #{&};

  @at-root  #{$parent}__input {
    z-index: 0;
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
    z-index: 8;
  }

  &.has-prefix {
    #{$parent}__input {
      padding-left: 48px;
    }
  }
}

</style>
