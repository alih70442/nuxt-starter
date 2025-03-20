<template>
  <base-modal
    title="ایجاد محصول با اکسل"
    ref="ref_modal"
  >
    <base-form
      :request="submit"
      #default="{ isFormLoading, submitForm }"
    >
      <p>
        فایل
        <a
          href="/files/product-excel.xlsx"
          class="text-info"
        >
          نمونه اکسل
        </a>
        را دانلود و آنرا پر کرده و آپلود کنید.
      </p>

      <div class="mt-4">
        <base-upload
          :input="inputs.excel"
          v-model="inputs.excel.value"
          ref="ref_file"
        />
      </div>

      <base-button
        class="w-full mt-6"
        type="primary"
        :disabled="!inputs.excel.value.length"
        :loading="isFormLoading"
        @click="submitForm"
      >
        آپلود
      </base-button>
    </base-form>
  </base-modal>
</template>

<script setup>
import BaseModal from '@/components/base/BaseModal.vue';
import useModal from '@/assets/js/composables/component/useModal.composable.js';
import { ref } from 'vue';
import BaseForm from '@/components/base/BaseForm.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import { store_supplier_product_excel } from '@/assets/js/api/supplier/product.api.js';
import get_response_data from '@/assets/js/helpers/get_response_data.js';
import BaseUpload from '@/components/base/BaseUpload.vue';

const emits = defineEmits(['submitted']);
const inputs = ref({
  excel: {},
});
const ref_file = ref();

const { ref_modal, hide, show } = useModal({
  onShow() {
    reset_form();
  },
});

const reset_form = () => {
  inputs.value.excel.value = [];
  ref_file.value?.reset();
};

const submit = async () => {
  await store_supplier_product_excel({
    excel: inputs.value.excel.value[0].raw,
  }).then(rs => {
    const rs_data = get_response_data(rs);

    emits('submitted', rs_data);

    hide();
  });
};

defineExpose({
  hide,
  show,
});
</script>

<style scoped></style>
