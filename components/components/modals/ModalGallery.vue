<template>
  <base-modal
    :fullscreen="true"
    ref="ref_modal"
    @closed="pause_videos"
  >
    <div class="mt-6">
      <div class="flex justify-center">
        <div class="w-full sm:w-[calc(100vh-230px)] max-w-full xs:max-w-[85vw] sm:max-w-[75vw]">
          <swiper
            :spaceBetween="10"
            :thumbs="{ swiper: thumbsSwiper }"
            :modules="modules"
            :navigation="true"
            @slideChange="onSlideChange"
            ref="ref_slider"
          >
            <swiper-slide
              v-for="file in sorted_files"
              :key="file.id"
            >
              <base-button @click="download_file({ path: file.storage_path })">
                <base-icon name="download" />
              </base-button>

              <div class="flex justify-center items-center mt-1">
                <video
                  class="t-slider__primary"
                  :poster="ImagePlaceholder"
                  preload="none"
                  loading="lazy"
                  controls
                  v-if="file.type_enum === 1"
                  ref="ref_videos"
                >
                  <source
                    :src="file.path"
                    type="video/mp4"
                  />
                  Sorry! you can download the video,
                  <a :href="file.path"> Download the video. </a>
                </video>

                <base-image
                  :src="file.path"
                  class="t-slider__primary"
                  fit="contain"
                  :lazy="false"
                  v-else
                />
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>

      <div class="fixed left-0 bottom-0 w-full z-10 pb-2 px-4">
        <swiper
          @swiper="setThumbsSwiper"
          :spaceBetween="8"
          slides-per-view="auto"
          :watchSlidesProgress="true"
          :modules="modules"
          class="t-bottomSlider mt-4"
        >
          <swiper-slide
            v-for="file in sorted_files"
            :key="file.id"
          >
            <div
              class="w-20 h-20 rounded border border-solid border-gray-200 cursor-pointer p-1"
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
              class="w-20 h-20 rounded border border-solid border-gray-200 cursor-pointer"
              fit="cover"
              :lazy="false"
              v-else
            />
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </base-modal>
</template>

<script setup>
import { computed, ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import 'swiper/css/navigation';
import BaseModal from '@/components/base/BaseModal.vue';
import useModal from '@/assets/js/composables/component/useModal.composable';
import { cloneDeep } from 'lodash';
import BaseImage from '@/components/base/BaseImage.vue';
import ImagePlaceholder from '@/assets/images/core/placeholder.png';
import BaseIcon from '@/components/base/BaseIcon.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import { download_file } from '@/assets/js/api/file.api';

const props = ref({});

const modules = [FreeMode, Thumbs, Navigation];
const thumbsSwiper = ref(null);
const files = ref([]);
const ref_videos = ref();
const ref_slider = ref();

const sorted_files = computed(() => {
  return cloneDeep(files.value).sort((a, b) => b.type_enum - a.type_enum);
});

const placeholder_image = computed(() => {
  return files.value.find(f => f.type_enum === 0) ?? {};
});

const { ref_modal, hide, show } = useModal({
  onShow(passed_files) {
    if (!passed_files?.length) {
      hide();
      return;
    }

    setTimeout(() => {
      ref_slider.value.$el.swiper.slideTo(0);
    });

    files.value = passed_files;
  },
});

const setThumbsSwiper = swiper => {
  thumbsSwiper.value = swiper;
};

const onSlideChange = () => {
  pause_videos();
};

const pause_videos = () => {
  ref_videos.value?.forEach(video => {
    video.pause();
  });
};

defineExpose({
  hide,
  show,
});
</script>

<style lang="scss" scoped>
.t-slider__primary {
  @include media($media-lg) {
  }
}

.t-bottomSlider {
  .swiper-slide {
    width: 80px;
  }
}
</style>
