<template>
  <nuxt-layout>
    <nuxt-page/>
  </nuxt-layout>
</template>

<script setup>
import { onMounted } from "vue";
import "~/assets/js/functions/validator/validator";
import { SimpleStorage } from "~/assets/js/classes/Storage";
import { KEY_REDIRECT_ORIGIN } from "~/assets/js/consts/storageKeys.const";
import get_env from "~/assets/js/functions/get_env.js";
import ImageLogo from "~/assets/images/core/logo-512.png";
import { init_clarity } from "assets/js/plugins/clarity.js";

const route = useRoute();

useHead({
  titleTemplate: (page_title) => page_title ? page_title + " | تامینیفای" : "تامینیفای",
  link: [
    {
      rel: "canonical",
      href: get_env("SITE_URL") + route.fullPath,
    },
  ],
  meta: [
    {
      property: "og:title",
      content: "%s",
    },
    // {
    //   name: "og:description",
    //   property: "%d", // todo
    // },
    {
      property: "og:locale",
      content: "fa_IR",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: get_env("SITE_URL") + route.fullPath,
    },
    {
      property: "og:site_name",
      content: "taminify.com",
    },
    {
      property: "og:image",
      content: ImageLogo,
    },
    {
      name: "twitter:card",
      content: "summary",
    },
    {
      name: "twitter:site",
      content: "taminify.com",
    },
    {
      name: "twitter:title",
      content: "%s",
    },
    // {
    //   name: "twitter:description",
    //   content: "%d", // todo
    // },
    {
      name: "twitter:image",
      content: ImageLogo,
    },
  ],
});

if (import.meta.client) {
  init_clarity();
}

onMounted(() => {

  if (route.query.utm_source && route.query.utm_medium) {
    SimpleStorage.setItem(KEY_REDIRECT_ORIGIN, {
      landing_url: window.location.origin + route.path,
      app: "web",
      ...route.query,
    });
  }
});

</script>

<style>

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}

.anim-floats-move,
.anim-floats-enter-active,
.anim-floats-leave-active {
  transition: all 0.5s ease;
  will-change: opacity, transform;
}

.anim-floats-enter-from,
.anim-floats-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.anim-floats-leave-active {
  position: absolute;
}

</style>
