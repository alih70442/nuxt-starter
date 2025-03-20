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
    v-model:file-list="model"
    :drag="comp_drag"
    :multiple="comp_multiple"
    :disabled="comp_disabled"
    :on-change="onChange"
    action="#"
    :auto-upload="false"
    list-type="picture-card"
  >
    <div class="flex flex-col items-center">
      <el-icon class="text-4xl">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512"
             enable-background="new 0 0 512 512" xml:space="preserve"><path d="M403.002,217.001C388.998,148.002,328.998,96,256,96c-57.998,0-107.998,32.998-132.998,81.001
          C63.002,183.002,16,233.998,16,296c0,65.996,53.999,120,120,120h260c55,0,100-45,100-100
          C496,263.002,455.004,219.999,403.002,217.001z M288,276v76h-64v-76h-68l100-100l100,100H288z"></path></svg>
      </el-icon>

      <div class="text-center text-xs mt-3">
        کلیک کنید یا فایل را بکشید و بیندازید
      </div>
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
</template>

<script setup>
import FormLabel from "@/components/base/Form/FormLabel.vue";
import FormError from "@/components/base/Form/FormError.vue";
import useInputValidation from "@/assets/js/composables/form/useInputValidation.js";
import useInput from "@/assets/js/composables/form/useInput.js";
import { computed } from "vue";

const model = defineModel({
  required: true,
});

const emits = defineEmits(["change"]);
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
  errorText: {
    type: String,
  },
  disabled: {
    type: Boolean,
  },
});

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

const comp_drag = computed_prop("drag", null);
const comp_multiple = computed_prop("multiple", null);
const comp_disabled = computed_prop("disabled", null);
const comp_errorText = computed(() => props.errorText || props.input.errorText || errorMessage.value);

const onChange = (val) => {
  emits("change");
};

</script>

<style scoped>

</style>