<template>
  <i :class="icon_class"></i>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const icon_class = computed(() => {
  return 'icon-' + props.name;
});
</script>

<style scoped></style>
