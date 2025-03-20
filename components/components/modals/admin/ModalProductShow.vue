<template>
  <base-modal
    title="اطلاعات محصول"
    ref="ref_modal"
  >
    <base-loading v-if="is_loading" />

    <template v-else>
      <div class="row text-sm mb-3">
        <div class="col w-3/12 text-neutral-400">شناسه</div>

        <div class="col w-9/12 text-neutral-600">tp-{{ data.id }}</div>
      </div>

      <div class="row text-sm mb-3">
        <div class="col w-3/12 text-neutral-400">نام</div>

        <div class="col w-9/12 text-neutral-600">
          {{ data.title }}
        </div>
      </div>

      <div class="row text-sm mb-3">
        <div class="col w-3/12 text-neutral-400">توضیحات</div>

        <div class="col w-9/12 text-neutral-600 whitespace-break-spaces">
          {{ data.description }}
        </div>
      </div>

      <div class="row text-sm mb-3">
        <div class="col w-3/12 text-neutral-400">وزن</div>

        <div class="col w-9/12 text-neutral-600">
          {{ format_currency(data.weight) }}
          گرم
        </div>
      </div>

      <div
        class="row text-sm mb-3"
        v-if="[data.length, data.width, data.height].some(dom => isNaN(dom))"
      >
        <div class="col w-3/12 text-neutral-400">ابعاد</div>

        <div
          class="col w-9/12 text-neutral-600"
          v-if="[data.length, data.width, data.height].every(dom => !isNaN(dom))"
        >
          {{ [data.length, data.width, data.height].join(' * ') }}
          سانتیمتر
        </div>
      </div>

      <div class="row text-sm mb-3">
        <div class="col w-3/12 text-neutral-400">دسته بندی</div>

        <div class="col w-9/12 text-neutral-600">
          {{ data.category.title }}
        </div>
      </div>

      <div
        class="row text-sm mb-3"
        v-if="data.preparation_days"
      >
        <div class="col w-3/12 text-neutral-400">زمان آماده سازی</div>

        <div class="col w-9/12 text-neutral-600">
          {{ data.preparation_days.title }}
        </div>
      </div>

      <div class="row text-sm mb-3">
        <div class="col w-3/12 text-neutral-400">انبار</div>

        <div class="col w-9/12 text-neutral-600">
          {{ data.warehouse.title }}
          <br />
          <div class="text-neutral-400">
            {{ data.warehouse.description }}
          </div>
        </div>
      </div>

      <div class="row text-sm mb-3">
        <div class="col w-3/12 text-neutral-400">ارسال از</div>

        <div class="col w-9/12 text-neutral-600">
          {{ data.warehouse.city.title }}
        </div>
      </div>

      <div class="row text-sm mb-3">
        <div class="col w-3/12 text-neutral-400">هزینه ارسال</div>

        <div class="col w-9/12 text-neutral-600">
          <base-currency :currency="data.warehouse.$send_price" />
        </div>
      </div>

      <div
        class="text-sm"
        v-if="data.product_variations?.length"
      >
        <div class="text-neutral-400">ویژگی ها</div>

        <table class="w-full table">
          <thead>
            <tr>
              <th>ویژگی</th>
              <th>موجودی</th>
              <th>قیمت</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="pv in data.product_variations"
              :key="pv.id"
            >
              <td>
                <template v-if="!pv.variation_types.length"> - </template>

                <ul class="text-xs">
                  <li
                    v-for="vt in pv.variation_types"
                    :key="vt.id"
                  >
                    {{ vt.type.title }}:
                    {{ vt.value.title }}
                  </li>
                </ul>
              </td>

              <td>
                {{ format_currency(pv.stock) }}
                عدد
              </td>

              <td>
                <base-currency :currency="pv.$price" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        class="text-sm"
        v-if="data.files?.length"
      >
        <div class="text-neutral-400">تصاویر</div>

        <list-gallery
          :files="data.files"
          :title="data.title"
          :preview-count="5"
          @select="ref_gallery?.show(data.files)"
          class="mt-2"
        />
      </div>
    </template>
  </base-modal>

  <modal-gallery ref="ref_gallery" />
</template>

<script setup>
import { ref } from 'vue';
import BaseModal from '@/components/base/BaseModal.vue';
import useModal from '@/assets/js/composables/component/useModal.composable.js';
import useFetch from '@/assets/js/composables/fetcher/useFetch';
import BaseLoading from '@/components/base/BaseLoading.vue';
import BaseCurrency from '@/components/base/BaseCurrency.vue';
import { format_currency } from '@/assets/js/functions/converts';
import ModalGallery from '@/components/modals/ModalGallery.vue';
import ListGallery from '@/components/other/ListGallery.vue';
import { show_admin_product } from '@/assets/js/api/admin/products.api';

const emits = defineEmits([]);

const ref_gallery = ref();

const { data, has_error, is_loading, filters, fetch } = useFetch(show_admin_product, {
  manual: true,
});

const { ref_modal, hide, show } = useModal({
  onShow(passed_id) {
    fetch({
      '%id': passed_id,
    });
  },
});

defineExpose({
  hide,
  show,
});
</script>

<style scoped></style>
