<template>
  <div>
    <the-header/>

    <slot/>

    <the-footer/>
  </div>
</template>

<script setup>
import TheHeader from "~/components/layouts/TheHeader";
import TheFooter from "~/components/layouts/TheFooter.vue";
</script>
