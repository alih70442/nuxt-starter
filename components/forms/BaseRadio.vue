<template>
  <div class="mb-2">
    <div class="c-radio">
      <input
        :name="name"
        v-bind="attrs"
        type="radio"
        class="c-radio__input"
        :id="input_id"
        :value="value"
        :checked="modelValue === value"
        :disabled="disabled"
        @input="onInput"
      >
      <label :for="input_id" class="c-radio__label">
        {{ label }}
      </label>
    </div>
    <p class="t-12 text-muted mt-1" v-if="helpText">{{ helpText }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import empty from "@/assets/js/functions/empty";
import get_unique_id from "@/assets/js/functions/get_unique_id";
import get_id from "@/assets/js/functions/id";

const emits = defineEmits(["select"]);
const props = defineProps({
  modelValue: {
    required: true,
  },
  value: {
    required: true,
  },
  label: {
    type: String,
  },
  rules: {
    type: String,
  },
  name: {
    type: String,
  },
  helpText: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  attrs: {
    type: String,
  },
});

let name = ref(props.name);
if (empty(name.value)) {
  name.value = get_unique_id();
}

const input_id = computed(() => {
  return get_id(true);
});

const onInput = ($event) => {
  emits("select", props.value);
};

</script>
