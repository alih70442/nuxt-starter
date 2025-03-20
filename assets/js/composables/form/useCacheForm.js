const useCacheForm = (cache_name) => {

  const save_form = (data) => {
    localStorage.setItem(cache_name, JSON.stringify(data));
  };

  const restore_form = (inputs_ref) => {
    const last_data = JSON.parse(localStorage.getItem(cache_name));

    if (typeof last_data !== "object" || last_data === null) return;

    Object.entries(last_data).forEach(([key, value]) => {
      if (!inputs_ref.value[key].value)
        inputs_ref.value[key].value = value;
    });
  };

  return {
    save_form,
    restore_form,
  };
};

export default useCacheForm;
