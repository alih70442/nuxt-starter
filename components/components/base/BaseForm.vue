<template>
  <Form
    ref="ref_form"
    @submit="submit"
  >
    <slot
      :isFormLoading="is_loading"
      :submitForm="submit"
    ></slot>
  </Form>
</template>

<script setup>
import { ref } from 'vue';
import { Form } from 'vee-validate';
import is_form_validated from '@/assets/js/helpers/is_form_validated';

const props = defineProps({
  request: {
    type: Function,
  },
});

const ref_form = ref();
const is_loading = ref(false);

const resetForm = () => {
  ref_form.value.resetForm();
};

const submit = async ($event, ...params) => {
  $event?.preventDefault();

  if (is_loading.value) return;

  if (!(await is_form_validated(ref_form.value))) throw false;

  is_loading.value = true;

  await props.request($event, ...params)?.finally(() => {
    is_loading.value = false;
  });

  is_loading.value = false;
};

defineExpose({
  resetForm,
  submit,
});
</script>

<style scoped></style>
