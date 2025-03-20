<template>
  <aside
    id="id-sidebar"
    class="fixed top-0 left-0 phone:left-auto phone:right-0 z-40 w-64 h-screen transition-transform -translate-x-full phone:translate-x-0"
    aria-label="Sidenav"
  >
    <div class="h-svh p-4">
      <div class="h-full bg-white rounded-lg shadow-lg phone:shadow-none py-4 px-3">
        <div class="h-full flex flex-col justify-between overflow-y-auto">
          <ul class="h-full space-y-2">
            <li
              v-for="page in primaryRoutes"
              :key="page.name"
            >
              <router-link
                :to="{ name: page.name }"
                class="flex items-center p-2 text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <base-icon
                  :name="page.meta.icon"
                  class="text-base me-3"
                />

                {{ page.meta.title }}
              </router-link>
            </li>
          </ul>

          <ul class="space-y-2 mt-2">
            <li
              v-for="role in changableRoles"
              :key="role"
            >
              <button
                type="button"
                class="w-full flex items-center p-2 text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-100"
                @click="change_role(role.key)"
              >
                <base-icon
                  name="login"
                  class="text-base me-3"
                />

                {{ role.title }}
              </button>
            </li>

            <li>
              <button
                type="button"
                class="w-full flex items-center p-2 text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-100"
                @click="logout"
              >
                <base-icon
                  name="logout-2"
                  class="text-base me-3"
                />

                خروج
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted } from 'vue';
import filter_sidebar from '@/assets/js/functions/router/filter_sidebar.js';
import { useUserStore } from '@/stores/StoreUser.js';
import BaseIcon from '@/components/base/BaseIcon.vue';
import { logout } from '@/assets/js/helpers/auth';
import { get_active_role, set_active_role } from '@/assets/js/helpers/get_active_role';
import RoleEnum from '@/assets/js/consts/roles.const';

const user = computed(() => {
  return useUserStore();
});

const user_data = computed(() => {
  return user.value.get_data;
});

const primaryRoutes = computed(() => {
  return filter_sidebar(user.value.get_routes.primary);
});

const changableRoles = computed(() => {
  const activeRole = get_active_role();

  return [
    ...(activeRole !== RoleEnum.admin && user_data.value.is_admin ?
      [
        {
          key: RoleEnum.admin,
          title: 'ادمین',
        },
      ]
    : []),
    ...(activeRole !== RoleEnum.supplier && user_data.value.is_supplier ?
      [
        {
          key: RoleEnum.supplier,
          title: 'تامین کننده',
        },
      ]
    : []),
    ...(activeRole !== RoleEnum.dropShipper && !user_data.value.is_supplier ?
      [
        {
          key: RoleEnum.dropShipper,
          title: 'دراپ شیپر',
        },
      ]
    : []),
  ];
});

const handle_sidebar_phone = () => {
  document.getElementById('id-sidebar').classList.add('-translate-x-full');
};

const change_role = role => {
  set_active_role(role);

  window.location.href = '/';
};

onMounted(() => {
  document.addEventListener('click', handle_sidebar_phone);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handle_sidebar_phone);
});
</script>

<style lang="scss" scoped>
.active {
  background-image: linear-gradient(to left, rgba($color-primary, 0.2) 10%, transparent);
  color: $color-primary !important;

  &:hover {
    background-image: linear-gradient(to left, rgba($color-primary, 0.2) 10%, transparent);
  }
}
</style>
