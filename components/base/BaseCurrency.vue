<template>
  <div>
    <div
      class="inline dir-ltr"
    >
      {{ format_currency(currency) }}
    </div>

    <div
      class="inline mr-1"
      style="font-size: 0.75em"
    >
      {{ suffix }}
    </div>
  </div>
</template>

<script setup>
import get_currency_suffix from "~/assets/js/helpers/get_currency_suffix";
import { format_currency } from "~/assets/js/functions/converts";

const props = defineProps({
  currency: {
    type: [Number, String],
    required: true,
  },
});

const suffix = get_currency_suffix();

</script>

<style scoped>

</style>