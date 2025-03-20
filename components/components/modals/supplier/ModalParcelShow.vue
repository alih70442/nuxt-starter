<template>
  <base-modal
    title="اطلاعات مرسوله"
    ref="ref_modal"
  >
    <base-loading v-if="is_loading" />

    <template v-else>
      <div class="row text-sm mb-3">
        <div class="col w-3/12 text-neutral-400">شناسه</div>

        <div class="col w-9/12 text-neutral-600">
          {{ data.parcel_number }}
        </div>
      </div>

      <div class="row text-sm mb-3">
        <div class="col w-3/12 text-neutral-400">زمان ثبت</div>

        <div class="col w-9/12 text-neutral-600">
          {{ get_date_time(data.created_at) }}
        </div>
      </div>

      <div class="row text-sm mb-3">
        <div class="col w-3/12 text-neutral-400">وضعیت</div>

        <div class="col w-9/12 text-neutral-600">
          {{ data.status.title }}
        </div>
      </div>

      <div class="row text-sm mb-3">
        <div class="col w-3/12 text-neutral-400">دراپ شیپر</div>

        <div class="col w-9/12 text-neutral-600">
          {{ data.order.shipper.name }}
          <br />
          {{ data.order.shipper.mobile }}
        </div>
      </div>

      <div class="row text-sm mb-3">
        <div class="col w-3/12 text-neutral-400">مشتری</div>

        <div class="col w-9/12 text-neutral-600">
          <div class="row space-y-1">
            <div class="col w-3/12 text-gray-400">نام</div>

            <div class="col w-9/12">
              {{ data.order.name }}
            </div>

            <div class="col w-3/12 text-gray-400">موبایل</div>

            <div class="col w-9/12">
              {{ data.order.mobile }}
            </div>

            <div class="col w-3/12 text-gray-400">کد پستی</div>

            <div class="col w-9/12">
              {{ data.order.postal_code }}
            </div>

            <div class="col w-3/12 text-gray-400">شهر</div>

            <div class="col w-9/12">
              {{ data.order.city.province.title }}
              -
              {{ data.order.city.title }}
            </div>

            <div class="col w-3/12 text-gray-400">آدرس</div>

            <div class="col w-9/12">
              {{ data.order.address }}
            </div>
          </div>
        </div>
      </div>

      <div class="row text-sm mb-3">
        <div class="col w-3/12 text-neutral-400">توضیحات مشتری</div>

        <div class="col w-9/12 text-neutral-600">
          {{ data.order.description }}
        </div>
      </div>

      <div class="row text-sm mb-3">
        <div class="col w-3/12 text-neutral-400">کد رهگیری</div>

        <div class="col w-9/12 text-neutral-600">
          <div v-if="!data.tracking_code">هنوز ثبت نشده</div>

          <ul v-if="data.tracking_code">
            <li>
              <a
                :href="'https://tracking.post.ir/?id=' + data.tracking_code"
                class="text-info"
                target="_blank"
              >
                <base-icon name="link" />
                {{ data.tracking_code }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="text-sm">
        <div class="text-neutral-400">محصولات</div>

        <table class="w-full table">
          <thead>
            <tr>
              <th>نام</th>
              <th>sku</th>
              <th>تعداد</th>
              <th>قیمت</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="item in data.items"
              :key="item.id"
            >
              <td>
                {{ item.item.product.title }}

                <ul class="text-xs">
                  <li
                    v-for="vt in item.item.variation_types"
                    :key="vt.id"
                  >
                    {{ vt.type.title }}:
                    {{ vt.value.title }}
                  </li>
                </ul>
              </td>

              <td>
                {{ item.item.sku }}
              </td>

              <td>
                {{ format_currency(item.quantity) }}
                عدد
              </td>

              <td>
                <base-currency :currency="item.$price" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="row text-sm mb-3">
        <div class="col w-3/12 text-neutral-400">مالی</div>

        <div class="col w-9/12 text-neutral-600">
          <div class="row space-y-1">
            <div class="col w-3/12 text-gray-400">محصولات</div>

            <div class="col w-9/12">
              <base-currency :currency="data.payments.$products" />
            </div>

            <div class="col w-3/12 text-gray-400">ارسال</div>

            <div class="col w-9/12">
              <base-currency :currency="data.payments.$send_price" />
            </div>

            <div class="col w-3/12 text-gray-400">کارمزد</div>

            <div class="col w-9/12">
              <base-currency :currency="data.payments.$fee" />
            </div>

            <div class="col w-3/12 text-gray-400">جمع کل</div>

            <div class="col w-9/12">
              <base-currency :currency="data.payments.$final" />
            </div>
          </div>
        </div>
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
import ModalGallery from '@/components/modals/ModalGallery.vue';
import { show_supplier_parcel } from '@/assets/js/api/supplier/parcel.api';
import { get_date_time } from '../../../assets/js/functions/time';
import { format_currency } from '@/assets/js/functions/converts';
import BaseCurrency from '@/components/base/BaseCurrency.vue';
import BaseIcon from '@/components/base/BaseIcon.vue';

const emits = defineEmits([]);

const ref_gallery = ref();

const { data, has_error, is_loading, filters, fetch } = useFetch(show_supplier_parcel, {
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
