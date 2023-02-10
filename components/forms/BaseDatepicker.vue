<template>
  <div class="c-input" :class="{'has-prefix': input.inputPrefix}">
    <label :for="input_id" v-show="input.label">
      {{ input.label }}
      <span class="text-danger" v-if="is_required">
          *
        </span>
    </label>
    <div class="input-group position-relative" :class="{'p-loading p-loading--left p-loading--bgWhite': input.loading}">
      <date-picker
        class="w-100"
        :class="{'has-error': errors.length}"
        :name="name"
        :format="format"
        :display-format="displayFormat"
        @change="onChange"
        locale="fa"
        :id="input_id"
        v-model="input.value"
        :disabled="disabled"
        :placeholder="placeholder"
        editable
        append-to="body"
        ref="ref_input"
      />
      <span v-if="input.inputPrefix" class="c-input__prefix">{{ input.inputPrefix }}</span>
    </div>
    <p class="t-12 text-muted mt-1" v-html="helpText" v-if="helpText"></p>
    <p class="t-12 text-muted mt-1" v-if="input.helpText">{{ input.helpText }}</p>
    <p class="text-danger t-12 ml-1 mt-1" v-show="!empty(errorMessage)">{{ errorMessage }}</p>
  </div>

</template>

<script setup>
import { ref } from "vue";
import empty from "@/assets/js/functions/empty";
import DatePicker from "vue3-persian-datetime-picker";
import { get_date } from "@/assets/js/functions/time";
import useInput from "@/assets/js/composables/form/useInput";

const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
  input: {
    required: true,
  },
  modelValue: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  helpText: {
    type: String,
  },
  placeholder: {
    type: String,
    default: get_date(new Date()),
  },
  translators: {
    type: Array,
    default: [],
  },
  format: {
    type: String,
    default: "jYYYY/jMM/jDD",
  },
  displayFormat: {
    type: String,
    default: "jYYYY/jMM/jDD",
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
  reset,
} = useInput(props, emits);

const ref_input = ref(null);

const onChange = () => {
  // emits("update:modelValue", ref_input.value.outputValue[0]);
};

const set = (value) => {
  ref_input.value.updateDates('1401/1/1')
};

defineExpose({
  reset,
  set,
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
