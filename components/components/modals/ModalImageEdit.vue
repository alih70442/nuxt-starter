<template>
  <!-- Upload Section -->
  <base-upload
    :input="input"
    v-model="model"
    v-model:file-list="fileList"
    :max-size="maxSize"
    :auto-upload="false"
    @change="handleFileChange"
  >
    <template #label-hint>
      <slot name="label-hint"></slot>
    </template>
  </base-upload>

  <base-modal
    title="ویرایش تصویر"
    ref="ref_modal"
    class="max-w-3xl"
  >
    <div class="space-y-4">
      <!-- Cropper Section -->
      <div class="relative w-full h-96">
        <img
          :src="imageSrc"
          class="max-w-full max-h-96"
          alt="Image to crop"
          ref="ref_image"
        />
      </div>

      <!-- Actions -->
      <div class="flex justify-end gap-2 mt-6">
        <base-button @click="hide"> لغو </base-button>

        <base-button
          type="primary"
          :loading="isLoading"
          @click="handleSave"
        >
          ذخیره
        </base-button>
      </div>
    </div>
  </base-modal>
</template>

<script setup>
import { ref, onUnmounted } from 'vue';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import BaseModal from '@/components/base/BaseModal.vue';
import BaseUpload from '@/components/base/BaseUpload.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import useModal from '@/assets/js/composables/component/useModal.composable';
import { upload_file } from '@/assets/js/api/file.api';
import useToast from '@/assets/js/composables/layout/useToast';
import computed_prop from '@/assets/js/helpers/computed_prop';

const model = defineModel({
  required: true,
});

const fileList = defineModel('fileList', {
  type: Array,
});

const emits = defineEmits(['saved']);

const props = defineProps({
  input: {
    type: Object,
  },
  type: {
    type: Number,
    required: true,
  },
  minHeight: {
    type: Number,
  },
  minWidth: {
    type: Number,
  },
  isSquare: {
    type: Boolean,
    default: false,
  },
  maxSize: {
    type: Number,
  },
});

// State
const imageSrc = ref('');
const isLoading = ref(false);
const ref_image = ref(null);

// Handle file removal
const onRemove = file => {
  model.value = model.value.filter(id => id !== file.uid);
};

const cropper = ref(null);

// Modal Controls
const { ref_modal, hide, show } = useModal({
  onShow() {
    reset();
  },
});

// Handle File Change
const handleFileChange = file => {
  if (file && file.raw) {
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        if (img.width < props.minWidth || img.height < props.minHeight) {
          useToast().create_danger(
            'طول و عرض تصویر باید بیشتر از ' + props.minWidth + ' و ' + props.minHeight + ' باشد.'
          );
          fileList.value.pop();
          return;
        }

        if (props.isSquare && img.width !== img.height) {
          useToast().create_danger('تصویر باید مربعی شکل باشد.');
          fileList.value.pop();
          return;
        }

        if (props.minHeight === img.height && props.minWidth === img.width) {
          upload(file.raw);
          return;
        }

        imageSrc.value = e.target.result;
        ref_modal.value.show();
        initCropper();
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file.raw);
  }
};

// Initialize Cropper
const initCropper = () => {
  if (cropper.value) {
    cropper.value.destroy();
    cropper.value = null;
  }

  setTimeout(() => {
    if (ref_image.value) {
      cropper.value = new Cropper(ref_image.value, {
        aspectRatio: 1,
        viewMode: 1,
        autoCropArea: 1,
        dragMode: 'move',
        guides: false,

        background: false,
        cropBoxMovable: true,
        cropBoxResizable: false,
        minCropBoxHeight: 800,
        minCropBoxWidth: 800,
      });
    }
  });
};

// Handle Save
const handleSave = async () => {
  if (cropper.value) {
    isLoading.value = true;

    cropper.value.getCroppedCanvas().toBlob(async blob => {
      await upload(blob);

      hide();
    });
  }
};

const upload = async blob => {
  try {
    const formData = new FormData();

    formData.append('file', blob);

    const response = await upload_file(formData);
    const newId = response.data.data.id;
    const fileUrl = response.data.data.path;

    model.value = [...model.value, newId];
    fileList.value[fileList.value.length - 1].id = newId;
    fileList.value[fileList.value.length - 1].name = `file-${newId}`;
    fileList.value[fileList.value.length - 1].url = fileUrl;
    fileList.value[fileList.value.length - 1].status = 'success';

    emits('saved', response.data);
  } catch (error) {
    console.error('Upload failed:', error);
  } finally {
    isLoading.value = false;
  }
};

// Reset State
const reset = () => {
  fileList.value = [];

  imageSrc.value = '';

  if (cropper.value) {
    cropper.value.destroy();
    cropper.value = null;
  }
};

// Cleanup
onUnmounted(() => {
  if (cropper.value) {
    cropper.value.destroy();
  }
});

defineExpose({
  hide,
  show,
});
</script>

<style>
.cropper-container {
  direction: ltr;
}
</style>
