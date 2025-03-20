<template>
  <div>
    <base-button
      class="relative"
      @click="ref_modal?.show"
    >
      <base-icon name="filter" />

      <span
        class="w-5 h-5 absolute -left-2 -top-2 bg-warning rounded-full text-sm text-center text-gray-700"
        v-show="filters_count > 0"
      >
        {{ filters_count }}
      </span>
    </base-button>

    <base-modal
      size="xs"
      title="فیلتر کردن لیست"
      ref="ref_modal"
      @hide="reset_filters"
    >
      <form action="#">
        <slot name="default"></slot>

        <div class="btn-sticky-bottom mt-4">
          <base-button
            class="w-full"
            type="primary"
            native-type="submit"
            @click.prevent="filter"
          >
            اعمال
          </base-button>
        </div>
      </form>
    </base-modal>
  </div>
</template>

<script setup>
import { computed, onBeforeMount, ref } from 'vue';
import { cloneDeep } from 'lodash';
import inputs_to_key_value from '@/assets/js/translators/inputs_to_key_value.translator.js';
import useModal from '@/assets/js/composables/component/useModal.composable.js';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import BaseModal from '@/components/base/BaseModal.vue';

const emits = defineEmits(['filter']);
const props = defineProps({
  filters: {
    type: Object,
  },
  exclude: {
    type: Array,
    default: [],
  },
});

const last_filters = ref({});
const ref_modal = ref();

const { hide, show } = useModal(ref_modal);

const filters_count = computed(() => {
  return Object.entries(last_filters.value).filter(([key, value]) => {
    return (
      !['search', 'orderby', 'skip', 'take'].includes(key) &&
      !props.exclude.includes(key) &&
      typeof value.value !== 'undefined' &&
      value.value !== null &&
      value.value !== ''
    );
  }).length;
});

const reset_filters = () => {
  // emits("update:modelValue", cloneDeep(last_filters.value));
};

const filter = () => {
  last_filters.value = cloneDeep(props.filters);

  emits('filter', inputs_to_key_value(props.filters));
  ref_modal.value.hide();
};

const sync = () => {
  last_filters.value = props.filters;
};

onBeforeMount(() => {
  last_filters.value = cloneDeep(props.filters);
});

defineExpose({
  hide,
  show,
  sync,
});
</script>

<style scoped></style>
