<template>
  <el-table
    :data="data"
    v-loading="loading"
    style="width: 100%"
    ref="ref_table"
  >
    <template #default="passed">
      <slot name="default" v-bind="passed"></slot>
    </template>

    <template #empty="passed">
      <slot name="empty" v-bind="passed"></slot>
    </template>

    <template #append="passed">
      <slot name="append" v-bind="passed">
        <div
          class="text-center py-2"
          v-if="!isLoadmoreDone"
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
    </template>
  </el-table>
</template>

<script setup>
import { ref } from "vue";
import BaseButton from "@/components/base/BaseButton.vue";

const emits = defineEmits(["load-more"]);
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
});

const ref_table = ref();

const loadMore = () => {
  emits("load-more");
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

<style scoped>

</style>