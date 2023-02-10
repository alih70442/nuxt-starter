<template>
  <li class="c-tab text-xl px-4 py-2" :class="{'active': isActive}" @click="select">
    <slot></slot>
  </li>
</template>

<script setup>

const emits = defineEmits(["select"]);
const props = defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
  },
});

const select = () => {
  emits("select", props.name);
};

</script>

<style lang="scss" scoped>

.c-tab {
  position: relative;
  cursor: pointer;
  user-select: none;

  &::before {
    @extend %transition-fast;

    content: '';

    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(0%) translateY(50%);

    width: 0;
    height: 3px;

    background: $color-primary;
    border-radius: 50rem;
  }

  &.active {
    pointer-events: none;
    font-weight: bold;

    &::before {
      transform: translateX(-50%) translateY(50%);
      width: 45px;
    }
  }
}

</style>