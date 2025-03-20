<template>
  <base-modal
    title="ویرایش محصول"
    ref="ref_modal"
  >
    <base-loading v-if="is_loading" />

    <template v-else>
      <base-form
        :request="submit"
        #default="{ isFormLoading, submitForm }"
      >
        <div class="mt-4">
          <base-input
            :input="inputs.title"
            v-model="inputs.title.value"
          />
        </div>

        <div class="mt-4">
          <base-input
            :input="inputs.description"
            v-model="inputs.description.value"
          />
        </div>

        <div class="mt-4">
          <base-input
            :input="inputs.profit_percent"
            v-model="inputs.profit_percent.value"
          />
        </div>

        <base-button
          class="w-full mt-6"
          type="primary"
          native-type="submit"
          :loading="isFormLoading"
          @click="submitForm"
        >
          ویرایش
        </base-button>
      </base-form>
    </template>
  </base-modal>

  <modal-gallery ref="ref_gallery" />
</template>

<script setup>
import { ref } from 'vue';
import BaseModal from '@/components/base/BaseModal.vue';
import useModal from '@/assets/js/composables/component/useModal.composable.js';
import useFetch from '@/assets/js/composables/fetcher/useFetch';
import BaseLoading from '@/components/base/BaseLoading.vue';
import ModalGallery from '@/components/modals/ModalGallery.vue';
import { cloneDeep } from 'lodash';
import ModalProductEditInputs from '@/assets/js/inputs/Shipper/ModalProductEdit.inputs';
import BaseInput from '@/components/base/BaseInput.vue';
import get_response_data from '@/assets/js/helpers/get_response_data';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseForm from '@/components/base/BaseForm.vue';
import {
  show_shipper_store_product,
  update_shipper_store_product,
} from '@/assets/js/api/shipper/store_product.api';

const emits = defineEmits(['submitted']);

let editing_id = null;
const inputs = ref(cloneDeep(ModalProductEditInputs));
const ref_gallery = ref();

const { data, has_error, is_loading, filters, fetch } = useFetch(show_shipper_store_product, {
  manual: true,
});

const { ref_modal, hide, show } = useModal({
  onShow(passed_id) {
    editing_id = passed_id;

    fetch({
      '%id': passed_id,
    }).then(rs_data => {
      inputs.value.title.value = rs_data.title || rs_data.product.title;
      inputs.value.description.value = rs_data.description || rs_data.product.description;
      inputs.value.profit_percent.value = rs_data.store_product_variations[0].profit_percent;
    });
  },
});

const submit = async () => {
  await update_shipper_store_product({
    '%id': editing_id,
    'title': inputs.value.title.value,
    'description': inputs.value.description.value,
    'profit_percent': inputs.value.profit_percent.value,
  }).then(rs => {
    const rs_data = get_response_data(rs);

    hide();

    emits('submitted', rs_data);
  });
};

defineExpose({
  hide,
  show,
});
</script>

<style scoped></style>
