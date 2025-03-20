<template>
  <el-table
    :data="data"
    v-loading="loading"
    style="width: 100%"
    @selection-change="onSelectionChange"
    ref="ref_table"
  >
    <template #default="passed">
      <slot
        name="default"
        v-bind="passed"
      ></slot>
    </template>

    <template #empty="passed">
      <template v-if="hasFilter"> با فیلترهای انتخابی، موردی یافت نشد. </template>

      <slot
        name="empty"
        v-bind="passed"
        v-else
      ></slot>
    </template>

    <template #append="passed">
      <slot
        name="append"
        v-bind="passed"
      >
        <div
          class="text-center py-2"
          v-if="!isLoadmoreDone || pageLoading"
        >
          <base-button
            type="primary"
            plain
            :loading="pageLoading"
            @click="loadMore"
          >
            نمایش بیشتر
          </base-button>
        </div>
      </slot>

      <transition-slide>
        <div
          class="fixed bottom-0 left-0 phone:w-[calc(100%-256px+16px)] container z-20 mr-auto"
          v-if="selected_ids.length"
        >
          <div
            class="empty:hidden bg-white shadow-2xl rounded-t-lg border border-solid border-gray-200 px-4 py-3"
          >
            <slot
              name="commands"
              :selected-ids="selected_ids"
            ></slot>
          </div>
        </div>
      </transition-slide>
    </template>
  </el-table>
</template>

<script setup>
import { ref } from 'vue';
import BaseButton from '@/components/base/BaseButton.vue';
import TransitionSlide from '@/components/transitions/TransitionSlide.vue';

const emits = defineEmits(['load-more']);
const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
  },
  pageLoading: {
    type: Boolean,
  },
  isLoadmoreDone: {
    type: Boolean,
  },
  hasFilter: {
    type: Boolean,
  },
});

const selected_ids = ref([]);
const ref_table = ref();

const loadMore = () => {
  emits('load-more');
};

const onSelectionChange = rows => {
  selected_ids.value = rows.map(r => r.id);
};

const getSelectionRows = () => ref_table.value.getSelectionRows();
const clearSelection = () => ref_table.value.clearSelection();
const getSelectionRowIds = () => getSelectionRows().map(r => r.id);

defineExpose({
  getSelectionRows,
  getSelectionRowIds,
  clearSelection,
});
</script>

<style scoped></style>
