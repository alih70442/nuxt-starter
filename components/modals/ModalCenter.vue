<template>
  <transition name="anim-fade">
    <div
      class="c-modal inset-0 js-modal"
      role="dialog"
      aria-modal="true"
      tabindex="-1"
      :data-modal="id"
      :class="class_size"
      v-show="visibility"
      @keyup.esc="hide_through_disabler"
      ref="ref_modal"
    >
      <div class="flex items-center justify-center px-sm-2">
        <div
          class="c-modal__disabler inset-0 js-modal__disabler"
          @mouseup="hide_through_disabler"
          @mousedown="allow_closing_through_disabler"
        ></div>
        <span class="h-screen">&#8203;</span>
        <div
          class="c-modal__body relative inline-block bg-white sm:my-3"
          @mouseup="prevent_closing_through_disabler"
        >
          <button
            type="button"
            class="icon-times p-link text-muted z-10 c-modal__close"
            v-if="has_close && can_close"
            @click="hide"
          ></button>

          <slot name="body"></slot>
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { computed, onBeforeMount, onMounted, onUnmounted, ref } from "vue";
import get_unique_id from "~/assets/js/functions/get_unique_id";
import empty from "~/assets/js/functions/empty";
import { useAppStore } from "~/store/StoreApp";

export default {
  props: {
    id: {
      type: String,
      default: "",
    },
    is_shown: {
      type: Boolean,
      default: false,
    },
    has_close: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
      default: "md",
    },
    can_close: {
      type: Boolean,
      default: true,
    },
    onHide: {
      type: Function,
      default: () => {},
    },
  },
  setup(props, { emit }) {
    const id = ref(props.id);
    const ref_modal = ref(null);
    const visibility = ref(false);
    const is_allow_closing_through_disabler = ref(false);

    const appStore = useAppStore();

    if (empty(id.value)) {
      id.value = get_unique_id();
    }

    const allow_closing_through_disabler = () => {
      is_allow_closing_through_disabler.value = true;
    };
    const prevent_closing_through_disabler = () => {
      is_allow_closing_through_disabler.value = false;
    };

    const show = () => {
      visibility.value = true;
      appStore.increment_modals_count();
    };

    const hide = () => {
      visibility.value = false;
      setTimeout(() => {
        props.onHide();
      }, 400);
      appStore.decrement_modals_count();
      is_allow_closing_through_disabler.value = false;
    };
    const hide_through_disabler = () => {
      if (props.can_close && is_allow_closing_through_disabler.value) {
        hide();
      }
    };
    const hide_through_esc = $event => {
      if ($event.keyCode === 27 && props.can_close) {
        hide();
      }
    };

    onBeforeMount(() => {
      window.addEventListener("keyup", hide_through_esc);
    });

    onUnmounted(() => {
      window.removeEventListener("keyup", hide_through_esc);
    });

    const class_size = computed(() => {
      switch (props.size) {
        case "xl":
          return "c-modal--xl";
        case "lg":
          return "c-modal--lg";
        case "md":
          return "c-modal--md";
        case "sm":
          return "c-modal--sm";
        case "xs":
          return "c-modal--xs";
        default:
          return "c-modal--md";
      }
    });

    onMounted(() => {
      if (props.is_shown) {
        visibility.value = true;
        appStore.decrement_modals_count();
      }
    });

    return {
      class_size,
      id,
      ref_modal,
      visibility,
      is_allow_closing_through_disabler,
      prevent_closing_through_disabler,
      allow_closing_through_disabler,
      hide_through_disabler,
      show,
      hide,
    };
  },
};
</script>

<style scoped lang="scss">
.c-modal {
  $parent: #{&};

  position: fixed;
  overflow-y: auto;
  z-index: 60;

  @at-root #{$parent}__disabler {
    @extend %transition-normal;

    background: rgba(black, 0.5);
    position: fixed;

    z-index: 0;
  }

  @at-root #{$parent}__close {
    position: absolute;
    left: 20px;
    top: 20px;
  }

  @at-root #{$parent}__body {
    @extend %transition-normal;

    position: relative;
    max-width: 100%;

    padding: 24px 16px;
    // overflow: hidden;
    @include media($media-sm) {
      border-radius: 12px;

      padding: 24px 24px;
    }
  }

  &--xs {
    & > div > #{$parent}__body {
      width: 360px;
    }
  }

  &--sm {
    & > div > #{$parent}__body {
      width: 500px;
    }
  }

  &--md {
    & > div > #{$parent}__body {
      width: 700px;
    }
  }

  &--lg {
    & > div > #{$parent}__body {
      width: 900px;
    }
  }

  &--xl {
    & > div > #{$parent}__body {
      width: 1300px;
    }
  }
}
</style>
