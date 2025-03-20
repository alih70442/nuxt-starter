<template>
  <main>
    <section class="bg-white dark:bg-gray-900">
      <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <h1 class="mb-4 text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight leading-none text-gray-900 dark:text-white">
          به سادگی به هزاران تامین کننده متصل شوید
        </h1>

        <p class="mb-8 text-lg font-normal text-gray-500 sm:px-16 xl:px-48 dark:text-gray-400">
          در تامینیفای، فروشنده‌ها را به تامین‌کنندگان برتر متصل می‌کنیم تا محصولات با حاشیه سود مناسب را بفروشند و کسب درآمد کنند.
        </p>

        <div class="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
          <nuxt-link
            :to="URL_REGISTER"
            class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
          >
            دریافت پنل

            <svg class="rotate-180 mr-2 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
            </svg>
          </nuxt-link>
        </div>
      </div>
    </section>

    <section class="bg-white dark:bg-gray-900">
      <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div class="max-w-screen-md mb-8 lg:mb-16">
          <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            امکانات ما برای ساده سازی راه شما
          </h2>

          <p class="text-gray-500 sm:text-xl dark:text-gray-400">
            در پنل تامینیفای، امکاناتی پیاده سازی شده است تا بتوانید به سادگی به دراپ شیپینگ بپردازید.
          </p>
        </div>

        <div class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
          <div>
            <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
              <svg class="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300" fill="currentColor" viewBox="0 0 20 20"
                   xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                      d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"></path>
              </svg>
            </div>

            <h3 class="mb-2 text-xl font-bold dark:text-white">
              محصولات
            </h3>

            <p class="text-gray-500 dark:text-gray-400">
              در تامینیفای محصولات را با قیمت همکاری در اختیارتان قرار می دهیم.
              همه محصولات از تولیدکنندگان و تامین کنندگان دست اول هستند.
            </p>
          </div>

          <div>
            <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
              <svg class="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300" fill="currentColor" viewBox="0 0 20 20"
                   xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>
              </svg>
            </div>

            <h3 class="mb-2 text-xl font-bold dark:text-white">
              بدون ارسال
            </h3>

            <p class="text-gray-500 dark:text-gray-400">
              تنها کافی است ثبت سفارش کنید. ارسال کالا با تامین کننده است.
            </p>
          </div>

          <div>
            <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
              <svg class="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300" fill="currentColor" viewBox="0 0 20 20"
                   xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                      d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                      clip-rule="evenodd"></path>
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path>
              </svg>
            </div>

            <h3 class="mb-2 text-xl font-bold dark:text-white">
              فروشگاه 24 ساعته
            </h3>

            <p class="text-gray-500 dark:text-gray-400">
              محصولاتتان را انتخاب و ویترین فروشگاهتان را پر کنید.
              فروشگاهتان به صورت 24 ساعته، آماده دریافت سفارش است.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white dark:bg-gray-900">
      <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <h2 class="mb-8 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
          سوالات متداول
        </h2>

        <div class="grid pt-8 border-t border-gray-200 md:gap-16 dark:border-gray-700">
          <ul class="row">
            <li class="col sm:w-6/12 mb-10">
              <h3 class="flex mb-4 text-lg font-medium text-gray-900 dark:text-white">
                <svg class="flex-shrink-0 ml-2 w-5 h-5 text-gray-500 dark:text-gray-400 mt-1" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clip-rule="evenodd"></path>
                </svg>

                محصولات را از کجا پیدا کنم؟
              </h3>

              <p class="text-gray-500 dark:text-gray-400">
                رسالت تامینیفای، در دسترس قرار دادن محصولات با قیمت همکاری،
                از تامین کنندگان و تولید کنندگان دسته اول است.
                در پنل تامینیفای هزاران محصول با کف قیمت وجود دارند تا شما آنها را در ویترین فروشگاهتان قرار دهید.
              </p>
            </li>

            <li class="col sm:w-6/12 mb-10">
              <h3 class="flex mb-4 text-lg font-medium text-gray-900 dark:text-white">
                <svg class="flex-shrink-0 ml-2 w-5 h-5 text-gray-500 dark:text-gray-400 mt-1" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clip-rule="evenodd"></path>
                </svg>

                تسویه حساب به چه صورتی انجام میشود؟
              </h3>

              <p class="text-gray-500 dark:text-gray-400">
                تسویه حساب ها به صورت هفتگی و به صورت پایا انجام میشود.
                باید دقت کنید که واریز وجه تنها در صورتی انجام میشود که دارنده حساب صاحب پنل تامینیفای باشد.
              </p>
            </li>

            <li class="col sm:w-6/12 mb-10">
              <h3 class="flex mb-4 text-lg font-medium text-gray-900 dark:text-white">
                <svg class="flex-shrink-0 ml-2 w-5 h-5 text-gray-500 dark:text-gray-400 mt-1" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clip-rule="evenodd"></path>
                </svg>

                آیا محصول را باید بخرم و برای مشتری ارسال کنم؟
              </h3>

              <p class="text-gray-500 dark:text-gray-400">
                خیر، تمامی محصولات اختصاصا با نام فروشگاه شما توسط تامین کننده بسته بندی و ارسال میشود.
                شما تنها روی فروشگاه و برند تان تمرکز کنید.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="bg-white dark:bg-gray-900 py-10">
      <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-sm text-center">
          <h2 class="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-900 dark:text-white">
            رایگان ثبت نام کنید
          </h2>

          <p class="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">
            رایگان ثبت‌نام کنید و به هزاران محصول با قیمت همکاری دسترسی پیدا کنید.
          </p>

          <nuxt-link
            :to="URL_REGISTER"
            class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
          >
            دریافت پنل

            <svg class="rotate-180 mr-2 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
            </svg>
          </nuxt-link>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { URL_REGISTER } from "assets/js/consts/urls.const.js";
</script>

<style scoped>

</style>