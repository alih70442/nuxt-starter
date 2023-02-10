import { ref, onMounted } from "vue";
import { is_response_ok } from "@/assets/js/network/helpers.network";

const useFetch = (request_handler, options) => {
  options = Object.assign({
    placeholder: {},
    params: {},
    manual: false,
  }, options);

  const data = ref(options.placeholder);
  const is_loading = ref(false);
  const has_error = ref(false);

  const fetch = (params) => {
    is_loading.value = true;
    return request_handler(params).then(rs => {
      if (!is_response_ok(rs)) return;

      data.value = rs.data.data;
      console.log(rs.data.data);
      return rs.data.data;
    }).finally(() => {

      is_loading.value = false;
    }).catch(() => {

      has_error.value = true;
    });
  };

  onMounted(() => {
    if (!options.manual)
      fetch(options.params);
  });

  return {
    data,
    has_error,
    is_loading,
    fetch,
  };
};

export default useFetch;
