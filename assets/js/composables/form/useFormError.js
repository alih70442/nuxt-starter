const useFormError = (inputs_ref) => {

  const reset_errors = () => {

    Object.keys(inputs_ref.value).forEach((key) => {
      inputs_ref.value[key].errorText = "";
    });
  };

  const reset_error = (key) => {

    if (key in inputs_ref.value) {
      inputs_ref.value[key].errorText = "";
    }
  };

  const set_errors = (errors_obj) => {

    Object.keys(errors_obj).forEach((key) => {

      if (key in inputs_ref.value) {
        inputs_ref.value[key].errorText = errors_obj[key]?.[0] ?? errors_obj[key];
      }
    });
  };

  const set_errors_by_response = (rs) => {
    const rs_message = rs.response.data.message;

    if (typeof rs_message !== "object" || rs_message === null)
      return;

    set_errors(rs_message);
  };

  return {
    reset_error,
    reset_errors,
    set_errors,
    set_errors_by_response,
  };
};

export default useFormError;
