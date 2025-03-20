<template>
  <form-label
    :label="input_label"
    :is-required="is_required"
  >
    <template #hint>
      <slot name="label-hint"></slot>
    </template>
  </form-label>

  <el-upload
    v-model:file-list="fileList"
    :name="input_name"
    :drag="comp_drag"
    :multiple="comp_multiple"
    :disabled="comp_disabled"
    :on-change="onChange"
    :on-remove="onRemove"
    action="#"
    :accept="comp_accept"
    :auto-upload="comp_autoUpload"
    list-type="picture-card"
    :http-request="httpRequest"
    :on-preview="handlePictureCardPreview"
    ref="ref_file"
  >
    <div class="flex flex-col items-center">
      <el-icon class="text-4xl">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 512 512"
          enable-background="new 0 0 512 512"
          xml:space="preserve"
        >
          <path
            d="M403.002,217.001C388.998,148.002,328.998,96,256,96c-57.998,0-107.998,32.998-132.998,81.001
          C63.002,183.002,16,233.998,16,296c0,65.996,53.999,120,120,120h260c55,0,100-45,100-100
          C496,263.002,455.004,219.999,403.002,217.001z M288,276v76h-64v-76h-68l100-100l100,100H288z"
          ></path>
        </svg>
      </el-icon>

      <div class="text-center text-xs mt-3">کلیک کنید یا فایل را بکشید و بیندازید</div>
    </div>

    <template #tip>
      <!--      <div class="el-upload__tip">-->
      <!--        jpg/png files with a size less than 500kb-->
      <!--      </div>-->
    </template>
  </el-upload>

  <form-error
    :help-text="input_helpText"
    :error-text="comp_errorText"
  />

  <base-modal v-model="dialogVisible">
    <base-image
      class="w-full"
      :src="dialogImageUrl"
      alt="Preview Image"
    />
  </base-modal>
</template>

<script setup>
import FormLabel from '@/components/base/Form/FormLabel.vue';
import FormError from '@/components/base/Form/FormError.vue';
import useInputValidation from '@/assets/js/composables/form/useInputValidation.js';
import useInput from '@/assets/js/composables/form/useInput.js';
import { computed, ref, watch } from 'vue';
import { upload_file } from '@/assets/js/api/file.api';
import useToast from '@/assets/js/composables/layout/useToast';

const model = defineModel({
  required: true,
  type: Array,
});

const fileList = defineModel('fileList', {
  type: Array,
});

const isUploading = defineModel('isUploading', {
  type: Boolean,
  default: false,
});

const emits = defineEmits(['change']);
const props = defineProps({
  input: {
    type: Object,
  },
  label: {
    type: String,
  },
  type: {
    type: String,
  },
  size: {
    type: String,
  },
  accept: {
    type: String,
  },
  errorText: {
    type: String,
  },
  disabled: {
    type: Boolean,
  },
  multiple: {
    type: [Boolean, null],
    default: null,
  },
  maxSize: {
    type: Number,
  },
  autoUpload: {
    type: Boolean,
    default: true,
  },
});

const dialogImageUrl = ref('');
const dialogVisible = ref(false);
const ref_file = ref();

const {
  is_required,
  input_id,
  input_name,
  input_disabled,
  input_helpText,
  input_label,
  computed_prop,
} = useInput(props, emits);

const { errorMessage, errors, inputValue, modelValue, handleChange, handleBlur, resetField } =
  useInputValidation(input_name, props);

const comp_drag = computed_prop('drag', null);
const comp_multiple = computed_prop('multiple', null);
const comp_disabled = computed_prop('disabled', null);
const comp_accept = computed_prop('accept', null);
const comp_maxSize = computed_prop('maxSize', null);
const comp_autoUpload = computed_prop('autoUpload', null);
const comp_errorText = computed(
  () => props.errorText || props.input.errorText || errorMessage.value
);

// Computed property to check if any file is currently uploading
const hasUploadingFiles = computed(() => {
  return fileList.value?.some(file => file.status === 'uploading');
});

// Watch hasUploadingFiles and update isUploading accordingly
watch(hasUploadingFiles, newValue => {
  isUploading.value = newValue;
});

const handlePictureCardPreview = uploadFile => {
  dialogImageUrl.value = uploadFile.url;
  dialogVisible.value = true;
};

const resetInputs = () => {
  ref_file.value.$el.querySelectorAll('input[type="file"]').forEach(file => {
    file.value = null;
  });
};

const validateFileSize = file => {
  if (!comp_maxSize.value) return true;

  const maxSizeBytes = comp_maxSize.value * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    useToast().create_danger(`حجم فایل باید کمتر از ${comp_maxSize.value} مگابایت باشد.`);
    return false;
  }
  return true;
};

// Handle file upload
const httpRequest = async options => {
  if (!validateFileSize(options.file)) {
    return Promise.reject('File size exceeds limit');
  }

  try {
    const file = options.file;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('__silent', true);

    // Find index of current file in fileList
    const fileIndex = fileList.value.findIndex(f => f.uid === file.uid);

    // Update status to uploading
    if (fileIndex > -1) {
      fileList.value[fileIndex].status = 'uploading';
    }

    const response = await upload_file(formData).catch(error => {
      useToast().create_danger(error.response.data.message);
    });

    const newId = response.data.data.id;
    const fileUrl = response.data.data.path;

    model.value = [...model.value, newId];

    // Update file details after successful upload
    if (fileIndex > -1) {
      fileList.value[fileIndex].id = newId;
      fileList.value[fileIndex].name = `file-${newId}`;
      fileList.value[fileIndex].url = fileUrl;
      fileList.value[fileIndex].status = 'success';
    }

    return Promise.resolve();
  } catch (error) {
    // Update status to error if upload fails
    const fileIndex = fileList.value.findIndex(f => f.uid === options.file.uid);
    if (fileIndex > -1) {
      fileList.value[fileIndex].status = 'error';
    }

    return Promise.reject(error);
  }
};

// Handle file removal
const onRemove = file => {
  model.value = model.value.filter(id => id !== file.id);
};

// Handle file change
const onChange = file => {
  emits('change', file);
  resetInputs();
};

const reset = () => {
  resetInputs();
  model.value = [];
};

defineExpose({
  reset,
});
</script>

<style scoped></style>
