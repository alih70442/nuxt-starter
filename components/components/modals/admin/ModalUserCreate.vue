<template>
  <base-modal
    title="کاربر جدید"
    ref="ref_modal"
  >
    <base-form
      :request="submit"
      #default="{ isFormLoading, submitForm }"
      ref="ref_form"
    >
      <div class="space-y-4">
        <base-input
          :input="inputs.name"
          v-model="inputs.name.value"
        />

        <base-input
          :input="inputs.mobile"
          v-model="inputs.mobile.value"
        />

        <base-switch
          :input="inputs.is_supplier"
          v-model="inputs.is_supplier.value"
        />

        <base-input
          :input="inputs.password"
          v-model="inputs.password.value"
        />
      </div>

      <base-button
        class="w-full mt-6"
        type="primary"
        native-type="submit"
        :loading="isFormLoading"
        @click="submitForm"
      >
        ایجاد
      </base-button>
    </base-form>
  </base-modal>
</template>

<script setup>
import { ref } from 'vue';
import BaseModal from '@/components/base/BaseModal.vue';
import useModal from '@/assets/js/composables/component/useModal.composable';
import { cloneDeep } from 'lodash';
import BaseForm from '@/components/base/BaseForm.vue';
import BaseInput from '@/components/base/BaseInput.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import { store_admin_user } from '@/assets/js/api/admin/user.api';
import ModalUserCreateInputs from '@/assets/js/inputs/Admin/ModalUserCreate.inputs';
import BaseSwitch from '@/components/base/BaseSwitch.vue';
import get_response_data from '@/assets/js/helpers/get_response_data';

const emits = defineEmits(['submitted']);

const inputs = ref(cloneDeep(ModalUserCreateInputs));
const ref_form = ref();

const { ref_modal, hide, show } = useModal({
  onShow() {
    resetForm();
  },
});

const resetForm = () => {
  Object.keys(inputs.value).forEach(key => {
    inputs.value[key].value = inputs.value[key].default ?? '';
  });

  setTimeout(() => {
    ref_form.value.resetForm();
  });
};

const submit = async () => {
  const params = {
    name: inputs.value.name.value,
    mobile: inputs.value.mobile.value,
    is_supplier: inputs.value.is_supplier.value,
    password: inputs.value.password.value,
  };

  await store_admin_user(params).then(rs => {
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
