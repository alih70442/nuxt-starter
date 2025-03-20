<template>
  <transition name="anim-fade">
    <slot />
  </transition>
</template>

<script setup></script>

<style scoped>
.anim-fade-enter-active,
.anim-fade-leave-active {
  will-change: opacity;
  transition: opacity 0.4s ease;
}

.anim-fade-enter-from,
.anim-fade-leave-to {
  opacity: 0;
}
</style>
