const close_mobile_keyboard = (input_selector) => {
  input_selector.readOnly = true;
  // input_selector.disabled = true;

  input_selector.focus();

  setTimeout(() => {
    input_selector.readOnly = false;
    // input_selector.disabled = false;
  });
};

export default close_mobile_keyboard;
