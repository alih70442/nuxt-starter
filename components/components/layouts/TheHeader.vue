<template>
  <nav class="container pt-4">
    <div class="bg-white rounded-lg px-4 sm:px-6">
      <div class="flex justify-between items-center h-12">
        <h1 class="font-bold text-sm">
          {{ page_title }}
        </h1>

        <div class="flex">
          <div class="flex items-center">
            <base-button
              text
              @click="() => router.push({ name: 'settings', query: { tab: 'profile' } })"
            >
              {{ get_user.name ?? 'کاربری' }}
            </base-button>
          </div>

          <button
            type="button"
            class="inline-flex phone:hidden items-center text-sm text-gray-500 rounded-lg p-2"
            @click.stop="show_sidebar"
          >
            <svg
              class="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import BaseButton from '@/components/base/BaseButton.vue';
import { computed } from 'vue';
import { useUserStore } from '@/stores/StoreUser.js';

const router = useRouter();
const route = useRoute();

const get_user = computed(() => {
  return useUserStore().get_data;
});

const page_title = computed(() => {
  return route.meta.title;
});

const show_sidebar = () => {
  document.getElementById('id-sidebar').classList.remove('-translate-x-full');
};
</script>
