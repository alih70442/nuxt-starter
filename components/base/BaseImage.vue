<template>
  <el-image
    :src="src"
    :alt="comp_alt"
    :width="width"
    :height="height"
    :lazy="lazy"
    :fit="fit"
  >
    <template #placeholder>
      <img
        :src="ImagePlaceholder"
        alt="تصویر پیشنمایش"
        :width="width"
        :height="height"
      >
    </template>
  </el-image>
</template>

<script setup>
import ImagePlaceholder from "@/assets/images/core/placeholder.png";
import { computed } from "vue";

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  alt: {
    type: String,
  },
  fit: {
    type: String,
  },
  width: {
    type: Number,
  },
  height: {
    type: Number,
  },
  lazy: {
    type: Boolean,
    default: true,
  },
});

const comp_alt = computed(() => {
  return props.alt || (props.title && props.src ? "تصویر " + props.title : "بدون موضوع");
});

</script>

<style scoped>

</style>