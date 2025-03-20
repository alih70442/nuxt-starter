<template>
  <form
    class="c-tableSearch relative"
    ref="ref_search_container"
  >
    <div class="el-input">
      <div class="el-input__wrapper">
        <input
          type="text"
          class="el-input__inner c-tableSearch__input"
          :placeholder="placeholder"
          :value="modelValue"
          :disabled="disabled"
          @input="onInput"
          @blur="search(modelValue)"
          @click.stop="onFocus"
          @keyup.enter="enter"
        />
      </div>
    </div>

    <button
      class="p-link c-tableSearch__btn"
      type="submit"
      @click.prevent="search(modelValue)"
    >
      <i class="icon-search-normal"></i>
    </button>

    <button
      class="p-link c-tableSearch__btn c-tableSearch__reset"
      type="button"
      @click="clear"
      v-show="modelValue"
    >
      <i class="icon-close text-xxs text-muted"></i>
    </button>

    <div
      class="w-full bg-white rounded-xl shadow-lg z-10"
      v-if="tags"
      v-show="is_menu_shown && filtered_tags.length"
      @click.stop
      ref="ref_tags_menu"
    >
      <ul
        class="overflow-auto mt-1 mb-0 pb-1"
        style="max-height: 200px"
      >
        <li
          class="cursor-pointer text-sm line-clamp-1 select-none px-2 py-2"
          @click="search_tag(tag)"
          v-for="tag in filtered_tags"
          :key="tag"
        >
          {{ tag }}
        </li>
      </ul>
    </div>
  </form>
</template>

<script setup>
import { computed, onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import is_like_match from '@/assets/js/functions/string/is_like_match.string.js';
import inputs_to_key_value from '@/assets/js/translators/inputs_to_key_value.translator.js';
import usePopper from '@/assets/js/composables/other/usePopper.js';

const emits = defineEmits(['search', 'enter', 'focus', 'filter', 'update:modelValue']);
const props = defineProps({
  modelValue: {},
  filters: {},
  placeholder: {
    default: 'بگرد دنبال ...',
  },
  tags: {
    type: Array,
  },
  disabled: {
    type: Boolean,
  },
});

const route = useRoute();
const TIMEOUT_DURATION = 800;
let timeout = null;
let last_search = '';
const is_menu_shown = ref(false);
const ref_search_container = ref(null);
const ref_tags_menu = ref(null);

const { show_popper, hide_popper } = usePopper(ref_search_container, ref_tags_menu, {
  strategy: 'absolute',
});

const filtered_tags = computed(() => {
  if (!props.modelValue) return props.tags;
  return props.tags.filter(tag => is_like_match(props.modelValue, tag));
});

const onFocus = () => {
  is_menu_shown.value = true;

  if (ref_tags_menu.value) show_popper();

  emits('focus');
};

const onFocusout = () => {
  is_menu_shown.value = false;

  if (ref_tags_menu.value) hide_popper();

  // emits("focusout");
};

const search = keyword => {
  if (timeout) clearTimeout(timeout);

  if (last_search === keyword) return;
  last_search = keyword;

  emits('update:modelValue', keyword);
  emits('search', keyword);

  if (props.filters) emits('filter', inputs_to_key_value(props.filters));
};

const search_tag = tag => {
  search(tag);

  onFocusout();
};

const clear = () => {
  search('');
};

const onInput = event => {
  const input_value = event.target.value;
  emits('update:modelValue', input_value);

  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(() => {
    search(input_value);
  }, TIMEOUT_DURATION);
};

const enter = () => {
  emits('enter');
};

onMounted(() => {
  if (route.query?.search) last_search = route.query.search;
});

onBeforeMount(() => {
  document.addEventListener('click', onFocusout);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', onFocusout);
});
</script>

<style lang="scss" scoped>
.c-tableSearch {
  $parent: #{&};

  @at-root #{$parent}__input {
    z-index: 0;

    @include media($media-md) {
      width: 240px;
    }
  }

  @at-root #{$parent}__btn {
    position: absolute;
    left: 4px;
    top: 50%;
    transform: translateY(-50%);

    height: 100%;

    z-index: 8;
    padding: 0 8px;
  }

  @at-root #{$parent}__reset {
    left: 36px;
    margin-top: 1px;
  }

  &--primary {
    #{$parent}__input {
      width: 100%;
      height: 54px;
      border: 1px solid $color-primary;
      font-size: ptr(18px);
    }

    #{$parent}__btn {
      & > i {
        font-size: ptr(18px);
      }
    }

    #{$parent}__reset {
      & > i {
        font-size: ptr(18px);
      }
    }
  }

  &--input100 {
    #{$parent}__input {
      width: 100%;
    }
  }
}
</style>
