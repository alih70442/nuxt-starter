<template>
  <div class="t-toasts">
    <transition-group
      name="anim-toast"
      tag="div"
      class="flex flex-col items-start"
    >
      <base-toast
        v-for="toast in toasts_list"
        :key="toast.id"
        :id="toast.id"
        :text="toast.text"
        :type="toast.type"
      ></base-toast>
    </transition-group>
  </div>
</template>

<script setup>
import BaseToast from "~/components/layouts/BaseToast";
import useToastsStore from "~/store/StoreToasts";

const toasts_list = computed(() => {
  return useToastsStore().toasts_list;
});
</script>

<style lang="scss" scoped>
.t-toasts {
  $parent: #{&};

  position: fixed;
  left: 10px;
  top: 60px;

  z-index: 60;

  @include media($media-md) {
    left: 20px;
    top: 60px;
  }

  @at-root #{$parent}__arrows {
  }
}
</style>
