<template>
  <div>
    <label :for="input_id">
      {{ input.label }}
      <span class="text-danger" v-if="is_required">
        *
      </span>
    </label>
    <div class="input-group position-relative">
      <div
        class="form-control position-relative text-center cursor-pointer"
        :class="{'has-error': errors.length, 'p-loading p-loading--center p-loading--bgWhite': isLoading, 'disabled': disabled}"
        @click="show_modal"
      >
        <template v-if="modelValue.length">
          {{ modelValue.length }}
          فایل انتخاب شده
        </template>
        <span class="text-muted" v-else>
            انتخاب فایل
        </span>
      </div>
      <button
        type="button"
        class="icon2-eye position-absolute right-0 top-1/2 -translate-y-1/2 p-link text-primary p-2"
        @click="show_modal"
        v-show="modelValue.length"
      ></button>
    </div>
    <p class="t-12 text-muted mt-1" v-html="helpText" v-if="helpText"></p>
    <p class="t-12 text-muted mt-1" v-if="input.helpText">{{ input.helpText }}</p>
    <p class="text-danger t-12 ml-1 mt-1" v-show="!empty(errorMessage)">{{ errorMessage }}</p>

    <teleport to="body">
      <modal-center
        :is_shown="false"
        :has_close="true"
        size="sm"
        ref="ref_files_modal"
      >
        <template #body>
          <h3 class="t-16 font-weight-bold mb-2">فایل ها</h3>

          <div class="mb-3" v-show="!has_reached_maxLength">
            <div
              class="position-relative bg-light rounded-lg py-5 border-dashed border-secondary border-[2px]"
              :class="{'has-error': errors.length, 'p-loading p-loading--center p-loading--bgWhite': isLoading, 'disabled': disabled}"
            >
              <input
                v-bind="$attrs"
                type="file"
                class="w-100 h-100 position-absolute right-0 top-0 opacity-0 cursor-pointer z-1"
                title="انتخاب فایل"
                :disabled="disabled"
                :id="input_id"
                @change="onChange"
                :multiple="maxLength > 1"
                ref="ref_input"
              />
              <span class="absolute-centering text-muted t-16">
                انتخاب یا انداختن فایل
              </span>
            </div>
            <p class="t-12 text-muted mt-1" v-html="helpText" v-if="helpText"></p>
            <p class="t-12 text-muted mt-1" v-if="input.helpText">{{ input.helpText }}</p>
            <p class="text-danger t-12 ml-1 mt-1" v-show="!empty(errorMessage)">{{ errorMessage }}</p>
          </div>

          <template v-for="file in modelValue" :key="file.id">
            <div class="d-flex align-items-center justify-content-between border mb-2" style="min-height: 64px;">
              <div class="d-flex align-items-center">
                <img :src="file.url" alt="تصویر آپلود شده" style="width: 72px;">
                <div class="ml-2">
                  <p class="word-break-all">
                    <span class="text-muted">نام فایل:</span>
                    {{ file.name }}
                  </p>
                </div>
              </div>

              <div class="p-2">
                <button
                  type="button"
                  class="icon2-trash btn text-danger p-2"
                  @click="remove_file(file)"
                  v-if="!disabled"
                ></button>
              </div>
            </div>
          </template>
        </template>
      </modal-center>
    </teleport>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import empty from "@/assets/js/functions/empty";
import { is_response_ok } from "@/assets/js/network/helpers.network";
import { request_upload_new } from "@/assets/js/api/user.api";
import useToastsStore from "@/stores/StoreToasts";
import asyncForEach from "@/assets/js/functions/array/asyncForEach";
import useInput from "@/assets/js/composables/form/useInput";

const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
  input: {
    required: true,
  },
  modelValue: {
    type: Array,
    default: [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  helpText: {
    type: String,
  },
  maxLength: {
    type: Number,
    default: 1,
  },
  fileType: {
    required: true,
    type: String,
  },
  memos: {
    required: false,
    type: Array,
    // image/png
    // image/jpeg
    // image/webp
    // image/gif
    // video/mp4
    // video/mpeg
    // video/ogg
    // audio/mpeg
    // audio/ogg
    // application/pdf
  },
});

const isLoading = ref(false);
const ref_input = ref(null);
const ref_files_modal = ref(null);
const files = ref([]);

const {
  errorMessage,
  errors,
  handleChange,
  resetField,
  handleBlur,
  inputValue,
  modelValue,
  is_required,
  input_id,
  name,
} = useInput(props, emits);

const has_reached_maxLength = computed(() => {
  return props.maxLength <= modelValue.value.length;
});

const upload_file = (file) => {
  return new Promise(async (resolve, reject) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", props.fileType);
    const rs = await request_upload_new(formData);
    if (!is_response_ok(rs)) reject(false);
    resolve(rs.data.data);
  });
};

const onChange = async ($event) => {
  if (isLoading.value) return;

  await asyncForEach($event.target.files, async (file) => {
    if (!file) return;
    if (!has_reached_maxLength) {
      useToastsStore().create_danger("بیشتر از " + props.maxLength + "فایل، نمیتوانید آپلود کنید.");
      return;
    }
    if (props.memos && !props.memos.includes(file.type)) {
      useToastsStore().create_danger("فرمت فایل انتخابی، معتبر نمی باشد.");
      return;
    }

    isLoading.value = true;
    await upload_file(file)
      .then((rs) => {
        emits("update:modelValue", modelValue.value.concat(rs));
        // files.value.push(file);
      });
  })
    .finally(() => {
      ref_input.value.value = null;
      isLoading.value = false;
    });
};

const reset = () => {
  emits("update:modelValue", []);
  // files.value = [];
};

const remove_file = (file) => {
  emits("update:modelValue", modelValue.value.filter(f => f.id !== file.id));
  // files.value = [];
};

const show_modal = () => {
  ref_files_modal.value.show();
};

defineExpose({
  reset,
});
</script>
