import useToastsStore from "/store/StoreToasts";

async function is_form_validated(ref_form) {
  const { valid } = await ref_form.validate();
  if (!valid)
    useToastsStore().create_warning("فرم را بررسی و مشکلات آن را رفع کنید.");
  return valid;
}

export default is_form_validated;
