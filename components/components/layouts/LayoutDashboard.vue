<template>
  <div>
    <the-sidebar />

    <div class="phone:w-[calc(100%-256px+16px)] mr-auto">
      <the-header />

      <div class="container py-6">
        <router-view v-slot="{ Component }">
          <transition
            name="router"
            mode="out-in"
          >
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import TheSidebar from '@/components/layouts/TheSidebar.vue';
import TheHeader from '@/components/layouts/TheHeader.vue';
import { refresh_user } from '@/assets/js/helpers/user.js';
import { get_active_role, set_active_role } from '@/assets/js/helpers/get_active_role';
import RoleEnum from '@/assets/js/consts/roles.const';
import useToast from '@/assets/js/composables/layout/useToast';
import { useRouter } from 'vue-router';
import { show_supplier_warehouse } from '@/assets/js/api/supplier/warehouse.api';
import get_response_data from '@/assets/js/helpers/get_response_data';
import { show_shipper_store } from '@/assets/js/api/shipper/store.api';
import { useUserStore } from '@/stores/StoreUser';

const router = useRouter();

const user_data = computed(() => {
  return useUserStore().get_data;
});

const is_warehouse_completed = () => {
  return show_supplier_warehouse({
    __silent: true,
  })
    .then(rs => {
      const rs_data = get_response_data(rs);

      const REQUIRED_FIELDS = ['title', 'description', 'city_id', '$send_price'];

      return REQUIRED_FIELDS.every(f => rs_data[f]);
    })
    .catch(() => {
      return false;
    });
};

const is_store_completed = () => {
  return show_shipper_store({
    __silent: true,
  })
    .then(rs => {
      const rs_data = get_response_data(rs);

      const REQUIRED_FIELDS = ['title', 'description', 'slug', '$send_price'];

      return REQUIRED_FIELDS.every(f => rs_data[f]);
    })
    .catch(() => {
      return false;
    });
};

onMounted(async () => {
  const activeRole = get_active_role();

  await refresh_user();

  if (activeRole === RoleEnum.supplier) {
    if (!user_data.value.is_supplier) {
      set_active_role(RoleEnum.dropShipper);
      return window.location.reload();
    }

    if (!(await is_warehouse_completed())) {
      useToast().create_warning('برای ادامه، اطلاعات انبارتان را تکمیل کنید.');

      await router.push({ name: 'settings', query: { tab: 'warehouse' } });
    }
  } else if (activeRole === RoleEnum.dropShipper) {
    if (user_data.value.is_supplier) {
      set_active_role(RoleEnum.supplier);
      return window.location.reload();
    }

    if (!(await is_store_completed())) {
      useToast().create_warning('برای ادامه، اطلاعات فروشگاهتان را تکمیل کنید.');

      await router.push({ name: 'settings', query: { tab: 'store' } });
    }
  } else if (activeRole === RoleEnum.admin) {
    if (!user_data.value.is_admin) {
      set_active_role(RoleEnum.dropShipper);
      return window.location.reload();
    }
  }
});
</script>

<style scoped></style>
