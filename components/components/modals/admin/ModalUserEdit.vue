<template>
  <base-modal
    title="ویرایش کاربر"
    ref="ref_modal"
  >
    <base-loading v-if="is_loading" />

    <template v-else>
      <base-form
        :request="submit"
        #default="{ isFormLoading, submitForm }"
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
          ویرایش
        </base-button>
      </base-form>
    </template>
  </base-modal>
</template>

<script setup>
import { ref } from 'vue';
import BaseModal from '@/components/base/BaseModal.vue';
import useModal from '@/assets/js/composables/component/useModal.composable';
import useFetch from '@/assets/js/composables/fetcher/useFetch';
import { cloneDeep } from 'lodash';
import ModalUserEditeInputs from '@/assets/js/inputs/Admin/ModalUserEdit.inputs';
import BaseLoading from '@/components/base/BaseLoading.vue';
import BaseForm from '@/components/base/BaseForm.vue';
import BaseInput from '@/components/base/BaseInput.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import { show_admin_user, update_admin_user } from '@/assets/js/api/admin/user.api';
import BaseSwitch from '@/components/base/BaseSwitch.vue';
import get_response_data from '@/assets/js/helpers/get_response_data';

const emits = defineEmits(['submitted']);

let editing_id = null;
const inputs = ref(cloneDeep(ModalUserEditeInputs));

const { data, is_loading, fetch } = useFetch(show_admin_user, {
  manual: true,
});

const { ref_modal, hide, show } = useModal({
  onShow(passed_id) {
    editing_id = passed_id;

    fetch({
      '%id': passed_id,
    }).then(rs_data => {
      inputs.value.name.value = rs_data.name;
      inputs.value.mobile.value = rs_data.mobile;
      inputs.value.is_supplier.value = rs_data.is_supplier;
    });
  },
});

const submit = async () => {
  const params = {
    '%id': editing_id,
    'name': inputs.value.name.value,
    'mobile': inputs.value.mobile.value,
    'is_supplier': inputs.value.is_supplier.value,
    ...(inputs.value.password.value && { password: inputs.value.password.value }),
  };

  await update_admin_user(params).then(rs => {
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
