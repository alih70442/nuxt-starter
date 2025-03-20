<template>
  <footer class="p-4 bg-white md:p-8 lg:p-10 dark:bg-gray-800 mt-12">
    <div class="mx-auto max-w-screen-xl text-center">
      <nuxt-link
        :to="URL_HOME"
        class="flex justify-center items-center text-xl font-semibold text-gray-900 dark:text-white"
      >
        <svg class="mr-3 h-7 text-white ml-3" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
             viewBox="0 0 512 512">
          <path
            d="M511.9 175c-9.1-75.6-78.4-132.4-158.3-158.7C390 55.7 416 116.9 416 192h28.1L327.5 321.5c-2.5-.6-4.8-1.5-7.5-1.5h-48V192h112C384 76.8 315.1 0 256 0S128 76.8 128 192h112v128h-48c-2.7 0-5 .9-7.5 1.5L67.9 192H96c0-75.1 26-136.3 62.4-175.7C78.5 42.7 9.2 99.5.1 175c-1.1 9.1 6.8 17 16 17h8.7l136.7 151.9c-.7 2.6-1.6 5.2-1.6 8.1v128c0 17.7 14.3 32 32 32h128c17.7 0 32-14.3 32-32V352c0-2.9-.9-5.4-1.6-8.1L487.1 192h8.7c9.3 0 17.2-7.8 16.1-17z"
            fill="currentColor"></path>
        </svg>

        تامینیفای
      </nuxt-link>

      <!--      <ul class="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white mt-6">-->
      <!--        <li>-->
      <!--          <a href="#" class="mr-4 hover:underline md:mr-6 ">About</a>-->
      <!--        </li>-->
      <!--      </ul>-->

      <div class="flex justify-center mt-4">
        <a
          referrerpolicy='origin'
          target='_blank'
          href='https://trustseal.enamad.ir/?id=545729&Code=7taUk3ukcRv9dYObov2x1q626If9ZZla'
        >
          <img
            referrerpolicy='origin'
            src='https://trustseal.enamad.ir/logo.aspx?id=545729&Code=7taUk3ukcRv9dYObov2x1q626If9ZZla'
            alt='تصویر اینماد سایت تامینیفای'
            style='cursor:pointer'
            code='7taUk3ukcRv9dYObov2x1q626If9ZZla'
          >
        </a>
      </div>

      <p
        class="text-sm text-gray-500 sm:text-center dark:text-gray-400 mt-6"
      >
        تمامی حقوق نزد تامینیفای محفوظ است.
      </p>
    </div>
  </footer>
</template>

<script setup>
import { URL_HOME } from "assets/js/consts/urls.const.js";
</script>

<style scoped>

</style>