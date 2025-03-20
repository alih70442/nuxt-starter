<template>
  <div>
    <base-loading v-if="isLoading" />

    <div v-else-if="!data.length">
      <!--      <base-img-->
      <!--        src="@/assets/images/core/empty.svg"-->
      <!--        title="جعبه خالی"-->
      <!--        width="180"-->
      <!--        class="mx-auto"-->
      <!--      />-->

      <div
        class="text-center text-neutral-600 py-4"
        v-if="hasFilter"
      >
        با فیلترهای انتخابی، موردی یافت نشد.
      </div>

      <slot
        name="empty"
        v-else
      >
        <div class="text-center mt-3">موردی وجود ندارد</div>
      </slot>
    </div>

    <div
      class="text-center"
      v-else-if="hasError"
    >
      <i class="icon-info-circle text-6xl text-danger"></i>

      <p class="text-base text-muted text-center mt-3">خطایی رخ داده است</p>

      <base-button
        class="mt-2"
        type="secondary"
        v-if="fetcher"
        @click="fetcher"
      >
        تلاش دوباره
      </base-button>
    </div>

    <div v-else>
      <slot :data-list="data"></slot>

      <div
        class="text-center py-2"
        v-if="!isLoadmoreDone || pageLoading"
      >
        <base-button
          type="primary"
          plain
          :loading="isLoading"
          @click="loadMore"
        >
          نمایش بیشتر
        </base-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseLoading from '@/components/base/BaseLoading.vue';
import BaseButton from '@/components/base/BaseButton.vue';

const emits = defineEmits(['load-more']);
const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  fetcher: {
    type: Function,
  },
  isLoading: {
    type: Boolean,
  },
  pageLoading: {
    type: Boolean,
  },
  hasError: {
    type: Boolean,
  },
  isLoadmoreDone: {
    type: Boolean,
  },
  hasFilter: {
    type: Boolean,
  },
});

const loadMore = () => {
  emits('load-more');
};
</script>

<style scoped></style>
