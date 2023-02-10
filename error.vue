<template>
  <main>

    <div class="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
      <div class="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
        <div class="relative">
          <div class="absolute">
            <div class="">
              <h1 class="text-gray-800 font-bold text-2xl">
                انگار گم شده اید...
              </h1>

              <p class="my-2 text-gray-800">
                متاسفیم، صفحه مورد نظر وجود ندارد، یا اینکه جا به جا شده است.
              </p>

              <nuxt-link
                to="/"
                class="p-btn p-btn--primary p-btn--lg mt-3">
                رفتن به خانه
              </nuxt-link>
            </div>
          </div>
          <div>
            <img :src="Image404" alt="تصویر عدد 404"/>
          </div>
        </div>
      </div>
      <div>
        <img :src="ImagePrimary" alt="تصویر دوشاخه کنده شده"/>
      </div>
    </div>

  </main>
</template>

<script setup>
import {useHead} from "nuxt/app";
import Image404 from "~/assets/images/404/404.png";
import ImagePrimary from "~/assets/images/404/primary.png";

useHead({
  head: {
    title: "صفحه موردنظر یافت نشد",
    meta: [
      {hid: "description", name: "description", content: "آمادست | صفحه ای که دنبال آن میگردید یافت نشد"},
      {name: "ROBOTS", content: "NOINDEX, NOFOLLOW"},
    ],
  },
});

</script>
