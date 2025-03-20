<template>
  <div class="flex items-center">
    <ul class="flex space-x-2 rtl:space-x-reverse ml-2">
      <li
        v-for="file in files.slice(0, previewCount)"
        :key="file.id"
        @click="select"
      >
        <div
          class="relative w-10 h-10 rounded border border-solid border-gray-200 p-1"
          v-if="file.type_enum === 1"
        >
          <base-image
            :src="placeholder_image.path"
            class="relative w-full aspect-square"
            style="filter: blur(4px); opacity: 0.5"
            fit="cover"
            :lazy="false"
          />

          <base-icon
            name="play"
            class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl text-white shadow-lg"
          />
        </div>

        <base-image
          :src="file.path"
          :title="title"
          class="w-10 h-10 rounded border border-solid border-gray-200"
          fit="cover"
          v-else
        />
      </li>
    </ul>

    <span v-if="files.length > previewCount">+{{ files.length - previewCount }}</span>
  </div>
</template>

<script setup>
import BaseImage from '@/components/base/BaseImage.vue';
import ImagePlaceholder from '@/assets/images/core/placeholder.png';
import { SwiperSlide } from 'swiper/vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import { computed } from 'vue';

const emits = defineEmits(['select']);
const props = defineProps({
  files: {
    type: Array,
  },
  title: {
    type: String,
  },
  previewCount: {
    type: Number,
    default: 2,
  },
});

const placeholder_image = computed(() => {
  return props.files.find(f => f.type_enum === 0) ?? {};
});

const select = () => {
  emits('select');
};
</script>

<style scoped></style>
