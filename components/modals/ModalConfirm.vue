<template>
  <modal-center
    :is_shown="false"
    :has_close="false"
    size="sm"
    style="z-index: 9090"
    ref="ref_modal"
  >
    <div class="text-center">
      <div
        class="w-32 h-32 absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 flex-centering bg-white shadow-lg rounded-full"
      >
        <nuxt-icon
          :name="options.icon"
          class="text-6xl text-primary"
          v-if="options.icon"
        />
      </div>

      <p class="text-xl text-gray-600 mt-16">
        {{ options.text }}
      </p>

      <div class="mt-6">
        <button
          type="button"
          class="p-btn p-btn--outline-primary mr-2"
          ref="ref_reject"
        >
          {{ options.rejectText }}
        </button>
        <button
          type="button"
          class="p-btn p-btn--primary"
          ref="ref_accept"
        >
          {{ options.acceptText }}
        </button>
      </div>
    </div>
  </modal-center>
</template>

<script setup>
import { ref } from "vue";
import ModalCenter from "~/components/modals/ModalCenter";

const options = ref({});
const DEFAULT_OPTIONS = {
  acceptText: "Yes",
  rejectText: "No",
  text: "Are you sure?",
  icon: "info-circle",
};
const ref_accept = ref(null);
const ref_reject = ref(null);
const ref_modal = ref(null);

const select = async () => {
  return await new Promise((resolve, reject) => {
    ref_accept.value.addEventListener(
      "click",
      function (e) {
        resolve("accepted");
      },
      { once: true },
    );
    ref_reject.value.addEventListener(
      "click",
      function (e) {
        reject("rejected");
      },
      { once: true },
    );
  });
};

const create = async opts => {
  options.value = Object.assign({ ...DEFAULT_OPTIONS }, opts);

  ref_modal.value.show();

  return await select()
  .then(rs => {
    return true;
  })
  .catch(rs => {
    return false;
  })
  .finally(() => {
    ref_modal.value.hide();
  });
};

defineExpose({
  create,
});
</script>

<style scoped lang="scss"></style>
