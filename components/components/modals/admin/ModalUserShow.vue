<template>
  <base-modal
    title="اطلاعات کاربر"
    ref="ref_modal"
  >
    <base-loading v-if="is_loading" />

    <template v-else>
      <div class="space-y-4">
        <div class="row text-sm">
          <div class="col w-3/12 text-neutral-400">آیدی</div>

          <div class="col w-9/12 text-neutral-600">
            {{ data.id }}
          </div>
        </div>

        <div class="row text-sm">
          <div class="col w-3/12 text-neutral-400">هش آیدی</div>

          <div class="col w-9/12 text-neutral-600">
            {{ data.hash_id }}
          </div>
        </div>

        <div class="row text-sm">
          <div class="col w-3/12 text-neutral-400">نام</div>

          <div class="col w-9/12 text-neutral-600">
            {{ data.name }}
          </div>
        </div>

        <div class="row text-sm">
          <div class="col w-3/12 text-neutral-400">موبایل</div>

          <div class="col w-9/12 text-neutral-600">
            {{ data.mobile }}
          </div>
        </div>

        <div class="row text-sm">
          <div class="col w-3/12 text-neutral-400">تاریخ ثبت نام</div>

          <div class="col w-9/12 text-neutral-600">
            {{ get_date_time(data.created_at) }}
          </div>
        </div>

        <div class="row text-sm">
          <div class="col w-3/12 text-neutral-400">کد ملی</div>

          <div class="col w-9/12 text-neutral-600">
            {{ data.national_code }}
          </div>
        </div>

        <div class="row text-sm">
          <div class="col w-3/12 text-neutral-400">ربات بله</div>

          <div class="col w-9/12 text-neutral-600">
            {{ data.bale_id ? 'متصل' : 'نامتصل' }}
          </div>
        </div>

        <div class="row text-sm">
          <div class="col w-3/12 text-neutral-400">دسترسی ها</div>

          <div class="col w-9/12 text-neutral-600">
            <template v-if="data.is_admin">
              ادمین
              <br />
            </template>
            <template v-if="data.is_supplier">
              تامین کننده
              <br />
            </template>
            دراپ شیپر
          </div>
        </div>
      </div>
    </template>
  </base-modal>
</template>

<script setup>
import BaseModal from '@/components/base/BaseModal.vue';
import useModal from '@/assets/js/composables/component/useModal.composable';
import useFetch from '@/assets/js/composables/fetcher/useFetch';
import { get_date_time } from '@/assets/js/functions/time';
import BaseLoading from '@/components/base/BaseLoading.vue';
import { show_admin_user } from '@/assets/js/api/admin/user.api';

const { data, is_loading, fetch } = useFetch(show_admin_user, {
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
