<template>
  <div>
    <div class="d-flex mb-2">
      <label :for="input_id" class="mb-0">
        {{ input.label }}
        <span class="text-danger" v-if="is_required">
          *
        </span>
      </label>
      <slot name="hint" class="mb-2"></slot>
    </div>
    <div
      class="c-select js-select"
      :class="{'p-loading p-loading--left p-loading--bgWhite': input.loading, 'selected': modelValue, 'has-error': errors.length}"
      data-component="Select"
      data-searchable="true"
      ref="ref_select"
    >
      <div
        class="c-select__toggler js-select__toggler"
        tabindex="0"
        :class="{'show': is_open, 'disabled': disabled}"
        @click.stop="toggle"
        @keyup.enter="open"
      >
        <span class="c-select__label js-select__label">
          {{ label_text }}
        </span>
      </div>

      <div
        class="c-select__menu js-select__menu"
        :class="{'show': is_open}"
      >
        <input
          class="c-select__search js-select__search"
          :class="{'has-error': errors.length}"
          type="text"
          placeholder="جستجوی ..."
          v-model="search_val"
          @input="search"
          @click.stop
          @keydown.up.prevent="go_up"
          @keydown.down.prevent="go_down"
          @keypress.prevent.enter="select_focused"
          @keyup.esc="close"
          ref="ref_search_input"
        />
        <div class="c-select__items js-select__items" ref="ref_menu">
          <template v-for="option in sorted_options" :key="option.id">
            <div
              class="c-select__item js-select__item"
              :class="{'selected': modelValue == option.id, 'disabled': false, 'd-none': option.hidden, 'focused': option.id === focus_id}"
              @click="select(option)"
            >
              {{ option.title }}
            </div>
          </template>
          <div class="text-muted py-2 px-2" v-if="search_val && !sorted_options.length">
            موردی یافت نشد!
          </div>
        </div>
      </div>
    </div>
    <p class="t-12 text-muted mt-1" v-if="input.helpText">{{ input.helpText }}</p>
    <p class="d-block text-danger t-12 ml-1 mt-1" v-show="!empty(errorMessage)">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import empty from "@/assets/js/functions/empty";
import is_like_match from "@/assets/js/functions/string/is_like_match.string";
import sort from "@/assets/js/functions/array/sort.array";
import get_position_top from "@/assets/js/functions/get_position_top";
import english_to_persian from "@/assets/js/translators/english_to_persian.translateor";
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
  storage: {
    type: String,
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
  reset,
} = useInput(props, emits);

const is_open = ref(false);
const ref_select = ref(null);
const ref_search_input = ref(null);
const ref_menu = ref(null);
const search_val = ref("");
const hidden_options_count = ref(0);
const focus_index = ref(0);
const focus_id = ref(0);
const scroll_index = ref(0);
const sorted_results = ref([]);


const onInput = (event) => {
  handleChange(event, true);
  const input_val = event.target.value;
  emits("update:modelValue", input_val);
};

const scroll_menu = (option_index) => {
  ref_menu.value.scrollTop = 38 * option_index;
};
const scroll_to_fit = () => {
  window.scrollTo(0, get_position_top(ref_select.value) - 40);
};

const toggle = () => {
  if (props.disabled) return;
  if (is_open.value) {
    close();
    return;
  }
  open();
};
const open = () => {
  if (props.disabled) return;
  // scroll_to_fit();

  const selected_index = props.input.options.findIndex(option => option.id == inputValue.value);

  if (inputValue.value) {
    focus_id.value = inputValue.value;
    focus_index.value = selected_index ?? 0;
  } else {
    focus_index.value = -1;
    go_down();
  }

  reset_search();
  setTimeout(() => {
    ref_search_input.value.focus();
    scroll_menu(focus_index.value);
    scroll_index.value = 0;
  });
  is_open.value = true;
};
const close = () => {
  is_open.value = false;
};

const select = (option) => {
  emits("update:modelValue", option.id?.toString());
  close();
  props.onChange(option);
};

const search = ($event) => {
  search_val.value = $event.target.value;

  focus_index.value = -1;
  go_down();
  scroll_menu(0);
};

const searched_options = computed(() => {
  const translated_persian_str = english_to_persian(search_val.value);
  return props.input.options.filter(option => is_like_match(translated_persian_str, option?.title));
});
const reset_search = () => {
  props.input.options.forEach(option => {
    option.hidden = false;
  });
  search_val.value = "";
  hidden_options_count.value = 0;
};
const go_up = () => {
  const shown_options = sorted_options.value;
  if (focus_index.value > 0) {
    focus_index.value--;
    focus_id.value = shown_options[focus_index.value].id;

    if (scroll_index.value <= 0) {
      scroll_menu(focus_index.value);
    } else {
      scroll_index.value--;
    }
  }
};
const go_down = () => {
  const shown_options = sorted_options.value;
  if (shown_options.length - 1 > focus_index.value) {
    focus_index.value++;
    focus_id.value = shown_options[focus_index.value].id;

    if (scroll_index.value >= 4) {
      scroll_menu(focus_index.value - 4);
    } else {
      scroll_index.value++;
    }
  }
};
const select_focused = () => {
  select(props.input.options.find(option => option.id == focus_id.value));
  close();
};

const label_text = computed(() => {
  const option = props.input.options.find(option => option.id == modelValue.value);
  if (option) return option.title;
  return props.input.placeholder;
});

const sorted_options = computed(() => {
  if (search_val.value.replace(/\s+/g, "") === "" || searched_options.value.length < 2) return searched_options.value;
  const translated_persian_str = english_to_persian(search_val.value);
  return sort(searched_options.value, translated_persian_str);
});

onMounted(() => {
  document.addEventListener("click", close);
});

onUnmounted(() => {
  document.removeEventListener("click", close);
});

defineExpose({
  reset,
});
</script>
