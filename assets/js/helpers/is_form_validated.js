import useToast from "@/assets/js/composables/layout/useToast.js";

async function is_form_validated(ref_form) {
  const { valid, errors } = await ref_form.validate();

  if (!valid) {
    useToast().create_warning("فرم را بررسی و مشکلات آن را رفع کنید.");

    const first_error_name = Object.keys(errors)[0];
    const first_error_input = document.querySelector("[name='" + first_error_name + "']");

    let scroll_container = first_error_input;

    while (scroll_container && !scroll_container.classList?.contains("js-modal")) {
      scroll_container = scroll_container.parentNode;
    }

    if (!scroll_container)
      scroll_container = window;

    const input_offset_top = first_error_input.getBoundingClientRect().top;

    scroll_container.scrollBy({
      top: input_offset_top - 80,
      behavior: "smooth",
    });

    return false;
  }
  return true;
}

export default is_form_validated;
