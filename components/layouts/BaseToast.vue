<template>
  <div
    class="t-toast alert alert-success position-relative overflow-hidden pl-12 pr-4 py-3 mb-2"
    :class="type"
    ref="ref-toast"
    @mouseenter="mouseenter"
    @mouseleave="mouseleave"
  >
    <button
      type="button"
      class="icon-times t-14 absolute left-3 top-2 mt-1 mr-2 p-1"
      @click="close"
    >
    </button>
    <span class="text-sm">{{ text }}</span>
  </div>
</template>

<script>
import useToastsStore from "/store/StoreToasts";

export default {
  props: {
    id: {
      type: [Number, String],
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "success",
    },
  },
  data() {
    return {
      timer: null,
      progress_timeout: null,
      time: 6000,
    };
  },
  methods: {
    close() {
      useToastsStore().remove(this.id);
      clearTimeout(this.timer);
      clearTimeout(this.progress_timeout);
    },
    start_timeout() {
      this.progress_timeout = setTimeout(() => {
        this.$refs["ref-toast"].classList.add("t-toast__progress--active");
      }, 500);
      this.timer = setTimeout(() => {
        this.time -= 1000;
        useToastsStore().remove(this.id);
      }, this.time);
    },
    mouseenter() {
      this.$refs["ref-toast"].classList.remove("t-toast__progress--active");
      clearTimeout(this.timer);
    },
    mouseleave() {
      this.start_timeout();
    },
  },
  mounted() {
    this.start_timeout();
  },
};
</script>

<style scoped lang="scss">

</style>
