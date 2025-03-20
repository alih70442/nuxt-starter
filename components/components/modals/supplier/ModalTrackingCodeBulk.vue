<template>
  <base-modal
    title="ثبت کد رهگیری با اکسل"
    :width="900"
    ref="ref_modal"
  >
    <base-form
      :request="import_parcels"
      #default="{ isFormLoading, submitForm }"
      v-if="!parcels.length"
    >
      <div>مراحل استفاده:</div>

      <ol class="list-decimal list-inside space-y-2 leading-loose">
        <li>
          اکسل تمامی سفارشاتی که در وضعیت آماده سازی هستند را دانلود کن.
          <br />
          <base-button
            type="primary"
            plain
            @click="download_excel"
          >
            دانلود اکسل
          </base-button>
        </li>

        <li>پس از ثبت کدهای رهگیری هر سفارش، آنرا در قسمت زیر آپلود کن.</li>
      </ol>

      <div class="mt-4">
        <base-upload
          :input="inputs.excel"
          v-model="inputs.excel.value"
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

    <base-form
      :request="submit"
      #default="{ isFormLoading, submitForm }"
      v-else
    >
      <base-table
        :data="parcels"
        :loading="false"
        :page-loading="false"
        :is-loadmore-done="true"
        class="mt-2"
        ref="ref_table"
      >
        <base-table-col
          label="شناسه مرسوله"
          #default="scope"
        >
          <base-button
            type="danger"
            text
            circle
            @click="remove(scope.row.id)"
            v-if="!scope.row.is_tracking_code_sat"
          >
            <base-icon name="trash" />
          </base-button>

          {{ scope.row.parcel_number }}
        </base-table-col>

        <base-table-col
          label="نام خریدار"
          #default="scope"
        >
          {{ scope.row.shipper_name }}
        </base-table-col>

        <base-table-col
          label="نام دراپ شیپر"
          #default="scope"
        >
          {{ scope.row.recipient_name }}
        </base-table-col>

        <base-table-col
          label="کد رهگیری"
          #default="scope"
        >
          <template v-if="scope.row.is_tracking_code_sat">
            <base-icon
              name="tick"
              class="text-success ml-1"
            />

            {{ scope.row.tracking_code }}
          </template>

          <div
            class="flex"
            v-else
          >
            <base-input
              :input="{ rules: '' }"
              v-model="scope.row.tracking_code"
            />

            <!--            <base-button-->
            <!--              type="success"-->
            <!--              :disabled="!scope.row.tracking_code"-->
            <!--              @click="set_tracking_code(scope.row.id, $event)"-->
            <!--            >-->
            <!--              ثبت-->
            <!--            </base-button>-->
          </div>
        </base-table-col>

        <base-table-col #default="scope">
          <div class="text-xs text-danger">
            {{ scope.row.error_message }}
          </div>
        </base-table-col>
      </base-table>

      <div class="text-left mt-4">
        <base-button
          type="primary"
          native-type="submit"
          :loading="isFormLoading"
          @click="submitForm"
        >
          ثبت کد رهگیری ها
        </base-button>
      </div>
    </base-form>
  </base-modal>
</template>

<script setup>
import BaseModal from '@/components/base/BaseModal.vue';
import useModal from '@/assets/js/composables/component/useModal.composable.js';
import { ref } from 'vue';
import BaseForm from '@/components/base/BaseForm.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseUpload from '@/components/base/BaseUpload.vue';
import {
  download_supplier_parcel_excel,
  send_supplier_parcel_bulk,
} from '@/assets/js/api/supplier/parcel.api';
import * as XLSX from 'xlsx';
import useToast from '@/assets/js/composables/layout/useToast';
import BaseTableCol from '@/components/base/table/BaseTableCol.vue';
import BaseInput from '@/components/base/BaseInput.vue';
import BaseTable from '@/components/base/table/BaseTable.vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import get_response_data from '@/assets/js/helpers/get_response_data';

const emits = defineEmits(['refresh']);
const inputs = ref({
  excel: {
    rules: 'required',
  },
});
const parcels = ref([]);
const parcel_id = ref(1);

const { ref_modal, hide, show } = useModal({
  onShow() {
    reset_form();
  },
  onHide() {
    if (parcels.value.some(p => p.is_tracking_code_sat)) {
      emits('refresh');
    }
  },
});

const download_excel = () => {
  download_supplier_parcel_excel({
    status: 1020,
  });
};

const reset_form = () => {
  parcel_id.value = 1;
  parcels.value = [];
  inputs.value.excel.value = [];
};

const reset_error_messages = () => {
  for (const parcel of parcels.value) {
    parcel.error_message = '';
  }
};

const excelFileToJSON = file => {
  return new Promise((resolve, reject) => {
    try {
      let reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = function (e) {
        let data = e.target.result;
        let workbook = XLSX.read(data, {
          type: 'binary',
        });
        const parcel_sheet = workbook.SheetNames[0];

        let roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[parcel_sheet], {
          blankRows: false,
          defval: '',
        });

        resolve({
          parcels: roa,
        });
      };
    } catch (e) {
      reject(e);
    }
  });
};

const import_parcels = () => {
  const file = inputs.value.excel.value[0];

  if (!file) {
    useToast().create_danger('فایلی انتخاب نشده است.');
    return;
  }
  var filename = file.raw.name;
  var extension = filename.substring(filename.lastIndexOf('.')).toUpperCase();

  if (!['.XLS', '.XLSX', '.CSV'].includes(extension)) {
    useToast().create_danger('فرمت فایل انتخابی باید xls یا xlsx یا csv باشد.');
    reset_form();
    return;
  }

  excelFileToJSON(file.raw).then(rs => {
    if (!rs['parcels'].length) {
      useToast().create_danger('در فایل انتخابی، سفارشی یافت نشد.');
      reset_form();
      return;
    }

    parcels.value = rs['parcels'].map(p => {
      parcel_id.value++;

      return {
        id: parcel_id.value,
        parcel_number: p['شناسه سفارش']?.toString(),
        shipper_name: p['نام دراپ شیپر'],
        recipient_name: p['نام خریدار'],
        tracking_code: p['کد رهگیری']?.toString(),
      };
    });
  });
};

const remove = async id => {
  const found_index = parcels.value.findIndex(p => p.id === id);

  parcels.value.splice(found_index, 1);
};

const submit = async () => {
  reset_error_messages();

  const final_parcels = parcels.value
    .filter(p => !p.is_tracking_code_sat)
    .map(p => ({
      parcel_number: p.parcel_number,
      tracking_code: p.tracking_code,
    }));

  await send_supplier_parcel_bulk({
    parcels: final_parcels,
  }).then(rs => {
    const rs_data = get_response_data(rs);

    for (const parcel of rs_data) {
      const found_parcel = parcels.value.find(p => p.parcel_number === parcel.parcel_number);

      if (!found_parcel) continue;

      if (parcel.result) {
        found_parcel.is_tracking_code_sat = true;
      } else {
        found_parcel.error_message = parcel.error_message;
      }
    }

    if (parcels.value.every(p => p.is_tracking_code_sat)) {
      useToast().create_success('تمامی کدهای رهگیری ثبت شدند.');

      hide();

      reset_form();
    }
  });
};

defineExpose({
  hide,
  show,
});
</script>

<style scoped></style>
