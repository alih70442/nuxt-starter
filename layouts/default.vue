<template>
  <div>

    <LayoutsTheHeader/>

    <slot/>

    <LayoutsTheFooter/>

    <teleport to="body">
      <modal-confirm ref="ref_confirm"/>

      <the-toasts/>
    </teleport>

  </div>
</template>

<script setup>
import TheToasts from "~/components/layouts/TheToasts";
import ModalConfirm from "~/components/modals/ModalConfirm";

</script>
