import { onMounted, ref } from "vue";
import inputs_to_key_value from "@/assets/js/translators/inputs_to_key_value.translator.js";
import cloneDeep from "lodash/cloneDeep";
import get_response_data from "@/assets/js/helpers/get_response_data.js";

const useFetch = (request_handler, options) => {
  options = Object.assign({
    placeholder: {},
    filters: {},
    manual: false,
    caching: {
      enable: false,
      name: null,
      purges: [],
    },
    onFetch: (data) => {
      return data;
    },
    onError: (error) => {
    },
  }, options);

  const request_options = {
    caching: options.caching,
  };
  const filters = {
    ...options.filters,
  };

  const data = ref(options.placeholder);
  const is_loading = ref(false);
  const has_error = ref(false);

  const fetch = (new_params = {}) => {
    let params = cloneDeep(new_params);
    has_error.value = false;
    is_loading.value = true;

    return request_handler(params, request_options).then(rs => {
      const rs_data = get_response_data(rs);

      data.value = options.onFetch(rs_data);

      return data.value;
    }).finally(() => {

      is_loading.value = false;
    }).catch((error) => {

      has_error.value = true;

      options.onError(error)

      throw error;
    });
  };

  onMounted(() => {
    if (!options.manual)
      fetch(inputs_to_key_value(options.filters));
  });

  return {
    data,
    has_error,
    is_loading,
    filters,
    fetch,
  };
};

export default useFetch;
