<template>
  <base-modal
    title="اطلاعات سفارش"
    ref="ref_modal"
  >
    <base-loading v-if="is_loading" />

    <template v-else>
      <div class="row text-sm mb-3">
        <div class="col w-3/12 text-neutral-400">شناسه</div>

        <div class="col w-9/12 text-neutral-600">
          {{ data.order_number }}
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
        <div class="col w-3/12 text-neutral-400">مشتری</div>

        <div class="col w-9/12 text-neutral-600">
          <div class="row space-y-1">
            <div class="col w-3/12 text-gray-400">نام</div>

            <div class="col w-9/12">
              {{ data.name }}
            </div>

            <div class="col w-3/12 text-gray-400">موبایل</div>

            <div class="col w-9/12">
              {{ data.mobile }}
            </div>

            <div class="col w-3/12 text-gray-400">کد پستی</div>

            <div class="col w-9/12">
              {{ data.postal_code }}
            </div>

            <div class="col w-3/12 text-gray-400">شهر</div>

            <div class="col w-9/12">
              {{ data.city.province.title }}
              -
              {{ data.city.title }}
            </div>

            <div class="col w-3/12 text-gray-400">آدرس</div>

            <div class="col w-9/12">
              {{ data.address }}
            </div>
          </div>
        </div>
      </div>

      <div class="row text-sm mb-3">
        <div class="col w-3/12 text-neutral-400">توضیحات مشتری</div>

        <div class="col w-9/12 text-neutral-600 whitespace-break-spaces">
          {{ data.description }}
        </div>
      </div>

      <div class="row text-sm mb-3">
        <div class="col w-3/12 text-neutral-400">کدهای رهگیری</div>

        <div class="col w-9/12 text-neutral-600">
          <div v-if="!data.parcels.find(p => p.tracking_code)">هنوز ثبت نشده</div>

          <ul v-else>
            <li
              v-for="parcel in data.parcels.filter(p => p.tracking_code)"
              :key="parcel.id"
            >
              <a
                :href="'https://tracking.post.ir/?id=' + parcel.tracking_code"
                class="text-info"
                target="_blank"
              >
                <base-icon name="link" />
                {{ parcel.tracking_code }}
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
            <div class="col w-5/12 text-gray-400">محصولات</div>

            <div class="col w-7/12">
              <base-currency :currency="data.payments.$products" />
            </div>

            <div class="col w-5/12 text-gray-400">ارسال</div>

            <div class="col w-7/12">
              <base-currency :currency="data.payments.$send_price" />
            </div>

            <div class="col w-5/12 text-gray-400">محصولات-تامین کننده</div>

            <div class="col w-7/12">
              <base-currency :currency="data.payments.$supplier_money" />
            </div>

            <div class="col w-5/12 text-gray-400">ارسال-تامین کننده</div>

            <div class="col w-7/12">
              <base-currency :currency="data.payments.$supplier_send_price" />
            </div>

            <div class="col w-5/12 text-gray-400">سود شما</div>

            <div class="col w-7/12">
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
import { get_date_time } from '@/assets/js/functions/time';
import { format_currency } from '@/assets/js/functions/converts';
import BaseCurrency from '@/components/base/BaseCurrency.vue';
import { show_shipper_order } from '@/assets/js/api/shipper/order.api';
import BaseIcon from '@/components/base/BaseIcon.vue';

const emits = defineEmits([]);

const ref_gallery = ref();

const { data, has_error, is_loading, filters, fetch } = useFetch(show_shipper_order, {
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
