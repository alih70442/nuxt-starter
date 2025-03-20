<template>
  <base-modal
    title="اطلاعات محصول"
    ref="ref_modal"
  >
    <base-loading v-if="is_loading" />

    <template v-else>
      <div class="row text-sm mb-3">
        <div class="col w-3/12 text-neutral-400">شناسه</div>

        <div class="col w-9/12 text-neutral-600">tp-{{ data.product.id }}</div>
      </div>

      <div class="row text-sm mb-3">
        <div class="col w-3/12 text-neutral-400">نام</div>

        <div class="col w-9/12 text-neutral-600">
          <template v-if="data.title">
            {{ data.title }}
            <br />
            <div class="text-neutral-400">
              اصلی:
              {{ data.product.title }}
            </div>
          </template>

          <template v-else>
            {{ data.product.title }}
          </template>
        </div>
      </div>

      <div class="row text-sm mb-3">
        <div class="col w-3/12 text-neutral-400">توضیحات</div>

        <div class="col w-9/12 text-neutral-600 whitespace-break-spaces">
          <template v-if="data.description">
            {{ data.description }}
            <br />
            <div class="text-neutral-400">
              اصلی:
              {{ data.product.description }}
            </div>
          </template>

          <template v-else>
            {{ data.product.description }}
          </template>
        </div>
      </div>

      <div class="row text-sm mb-3">
        <div class="col w-3/12 text-neutral-400">وزن</div>

        <div class="col w-9/12 text-neutral-600">
          {{ format_currency(data.product.weight) }}
          گرم
        </div>
      </div>

      <div
        class="row text-sm mb-3"
        v-if="
          [data.product.length, data.product.width, data.product.height].some(dom => isNaN(dom))
        "
      >
        <div class="col w-3/12 text-neutral-400">ابعاد</div>

        <div
          class="col w-9/12 text-neutral-600"
          v-if="
            [data.product.length, data.product.width, data.product.height].every(dom => !isNaN(dom))
          "
        >
          {{ [data.product.length, data.product.width, data.product.height].join(' * ') }}
          سانتیمتر
        </div>
      </div>

      <div class="row text-sm mb-3">
        <div class="col w-3/12 text-neutral-400">دسته بندی</div>

        <div class="col w-9/12 text-neutral-600">
          {{ data.product.category.title }}
        </div>
      </div>

      <div
        class="row text-sm mb-3"
        v-if="data.product.preparation_days"
      >
        <div class="col w-3/12 text-neutral-400">زمان آماده سازی</div>

        <div class="col w-9/12 text-neutral-600">
          {{ data.product.preparation_days.title }}
        </div>
      </div>

      <div class="row text-sm mb-3">
        <div class="col w-3/12 text-neutral-400">انبار</div>

        <div class="col w-9/12 text-neutral-600">
          {{ data.product.warehouse.title }}
          <br />
          <div class="text-neutral-400">
            {{ data.product.warehouse.description }}
          </div>
        </div>
      </div>

      <div class="row text-sm mb-3">
        <div class="col w-3/12 text-neutral-400">ارسال از</div>

        <div class="col w-9/12 text-neutral-600">
          {{ data.product.warehouse.city.province.title }}
          -
          {{ data.product.warehouse.city.title }}
        </div>
      </div>

      <div class="row text-sm mb-3">
        <div class="col w-3/12 text-neutral-400">هزینه ارسال</div>

        <div class="col w-9/12 text-neutral-600">
          <base-currency :currency="data.product.warehouse.$send_price" />
        </div>
      </div>

      <div
        class="text-sm"
        v-if="data.store_product_variations?.length"
      >
        <div class="text-neutral-400">ویژگی ها</div>

        <table class="w-full table">
          <thead>
            <tr>
              <th>ویژگی</th>
              <th>موجودی</th>
              <th>قیمت</th>
              <th>قیمت شما</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="spv in data.store_product_variations"
              :key="spv.id"
            >
              <td>
                <template v-if="!spv.product_variation.variation_types.length"> - </template>

                <ul class="text-xs">
                  <li
                    v-for="vt in spv.product_variation.variation_types"
                    :key="vt.id"
                  >
                    {{ vt.type.title }}:
                    {{ vt.value.title }}
                  </li>
                </ul>
              </td>

              <td>
                {{ format_currency(spv.product_variation.stock) }}
                عدد
              </td>

              <td>
                <base-currency :currency="spv.product_variation.$price" />
              </td>

              <td>
                <base-currency
                  :currency="(spv.product_variation.$price * (100 + spv.profit_percent)) / 100"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        class="text-sm"
        v-if="data.product.files?.length"
      >
        <div class="text-neutral-400">تصاویر</div>

        <list-gallery
          :files="data.product.files"
          :title="data.product.title"
          :preview-count="5"
          @select="ref_gallery?.show(data.product.files)"
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
import { show_shipper_store_product } from '@/assets/js/api/shipper/store_product.api';

const emits = defineEmits([]);

const ref_gallery = ref();

const { data, has_error, is_loading, filters, fetch } = useFetch(show_shipper_store_product, {
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
