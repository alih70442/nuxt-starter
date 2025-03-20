<template>
  <header>
    <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
      <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <nuxt-link
          :to="URL_HOME"
          class="flex items-center"
        >
          <svg class="h-6 text-white ml-2" xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 512 512">
            <path
              d="M511.9 175c-9.1-75.6-78.4-132.4-158.3-158.7C390 55.7 416 116.9 416 192h28.1L327.5 321.5c-2.5-.6-4.8-1.5-7.5-1.5h-48V192h112C384 76.8 315.1 0 256 0S128 76.8 128 192h112v128h-48c-2.7 0-5 .9-7.5 1.5L67.9 192H96c0-75.1 26-136.3 62.4-175.7C78.5 42.7 9.2 99.5.1 175c-1.1 9.1 6.8 17 16 17h8.7l136.7 151.9c-.7 2.6-1.6 5.2-1.6 8.1v128c0 17.7 14.3 32 32 32h128c17.7 0 32-14.3 32-32V352c0-2.9-.9-5.4-1.6-8.1L487.1 192h8.7c9.3 0 17.2-7.8 16.1-17z"
              fill="currentColor"></path>
          </svg>

          <span class="self-center text-lg font-semibold whitespace-nowrap dark:text-white">تامینیفای</span>
        </nuxt-link>

        <div class="flex items-center lg:order-2">
          <nuxt-link
            :to="URL_LOGIN"
            class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
          >
            ورود
          </nuxt-link>

          <nuxt-link
            :to="URL_REGISTER"
            class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
          >
            شروع کن
          </nuxt-link>

          <!--      <button data-collapse-toggle="mobile-menu-2" type="button"-->
          <!--              class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"-->
          <!--              aria-controls="mobile-menu-2" aria-expanded="false">-->
          <!--        <span class="sr-only">Open main menu</span>-->
          <!--        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">-->
          <!--          <path fill-rule="evenodd"-->
          <!--                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"-->
          <!--                clip-rule="evenodd"></path>-->
          <!--        </svg>-->
          <!--        <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">-->
          <!--          <path fill-rule="evenodd"-->
          <!--                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"-->
          <!--                clip-rule="evenodd"></path>-->
          <!--        </svg>-->
          <!--      </button>-->
        </div>

        <!--    <div class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">-->
        <!--      <ul class="flex flex-col mt-4 font-medium lg:flex-row space-x-6 rtl:space-x-reverse lg:mt-0">-->
        <!--        <li>-->
        <!--          <a-->
        <!--            href="#"-->
        <!--            class="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"-->
        <!--            aria-current="page"-->
        <!--          >-->
        <!--            خانه-->
        <!--          </a>-->
        <!--        </li>-->
        <!--        <li>-->
        <!--          <a-->
        <!--            href="#"-->
        <!--            class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"-->
        <!--          >-->
        <!--            درباره ما-->
        <!--          </a>-->
        <!--        </li>-->
        <!--      </ul>-->
        <!--    </div>-->
      </div>
    </nav>
  </header>
</template>

<script setup>
import { URL_HOME, URL_LOGIN, URL_REGISTER } from "assets/js/consts/urls.const.js";
</script>
