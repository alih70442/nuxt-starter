<template>
  <main>
    <div class="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-start flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
      <div class="xl:pt-24 w-full xl:w-1/2 pb-12 lg:pb-0">
        <div class="relative">
          <div v-if="error?.statusCode >= 500">
            <h1 class="text-gray-800 font-bold text-2xl">
              انگار یه جای کار می لنگه...
            </h1>

            <p class="my-2 text-gray-800">
              متاسفانه، مشکلی پیش آمده است
            </p>

            <nuxt-link
              to="/"
              class="c-btn c-btn--secondary mt-3">
              رفتن به خانه
            </nuxt-link>
          </div>

          <div v-else-if="error?.statusCode >= 400">
            <h1 class="text-gray-800 font-bold text-2xl">
              {{ "انگار گم شده اید..." }}
            </h1>

            <p class="my-2 text-gray-800">
              {{ "متاسفیم، صفحه مورد نظر وجود ندارد، یا اینکه جا به جا شده است." }}
            </p>

            <nuxt-link
              to="/"
              class="c-btn c-btn--secondary mt-3">
              رفتن به خانه
            </nuxt-link>
          </div>

          <div v-else>
            <h1 class="text-gray-800 font-bold text-2xl">
              {{ error?.statusMessage ?? "انگار گم شده اید..." }}
            </h1>

            <p class="my-2 text-gray-800">
              {{ error?.message ?? "متاسفیم، صفحه مورد نظر وجود ندارد، یا اینکه جا به جا شده است." }}
            </p>

            <nuxt-link
              to="/"
              class="c-btn c-btn--secondary mt-3">
              رفتن به خانه
            </nuxt-link>
          </div>

          <div class="absolute right-0 top-1/2 -translate-y-1/2 text-blue-700/5 font-bold text-[14rem] sm:text-[20rem] leading-tight -z-10">
            {{ error?.statusCode }}
          </div>
        </div>
      </div>

      <div>
        <img :src="ImagePrimary" alt="تصویر دوشاخه کنده شده"/>
      </div>
    </div>

    <div
      class="container py-10"
      v-if="dev"
    >
      <p>
        {{ error?.message }}
      </p>

      <p
        class="mt-4"
        v-html="error?.stack"
      ></p>
    </div>
  </main>
</template>

<script setup>
import { useHead } from "nuxt/app";
import ImagePrimary from "~/assets/images/404/primary.png";
import is_dev from "assets/js/functions/is_dev.js";

useHead({
  head: {
    title: "صفحه موردنظر یافت نشد",
    meta: [
      { hid: "description", name: "description", content: "تامینیفای | صفحه ای که دنبال آن میگردید یافت نشد" },
      { name: "ROBOTS", content: "NOINDEX, NOFOLLOW" },
    ],
  },
});

const dev = is_dev();

const error = useError();
console.log(error.value);

</script>
