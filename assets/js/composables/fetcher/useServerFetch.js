import { ref } from "vue";
import { useCookie, useFetch } from "nuxt/app";
import get_base_url from "assets/js/functions/route/get_base_url.js";
import inputs_to_key_value from "assets/js/translators/inputs_to_key_value.translator.js";
import make_bearer_token from "assets/js/functions/api/make_bearer_token.js";
import { KEY_ACCESS_TOKEN } from "assets/js/consts/storageKeys.const.js";

const useServerFetch = async (request_url, options) => {
  options = Object.assign(
    {
      placeholder: {},
      server: true,
      in_load: false,
      watch: false,
      onResponse: () => {
      },
    },
    options,
  );

  const runtimeConfig = useRuntimeConfig()
  const token = useCookie(KEY_ACCESS_TOKEN);
  const is_loading = ref(options.server ? false : options.in_load);
  const filters = ref({
    ...options.filters,
  });

  const fetch = async () => {

    const {
      data,
      pending,
      refresh,
      execute,
      error,
      status,
    } = await useFetch(request_url, {
      ...options,
      headers: {
        "Accept": "application/json",
        Authorization: token.value ? make_bearer_token(token.value) : "",
        "X-Currency": "IRT", // IRT | IRR
      },
      query: inputs_to_key_value(filters.value),
      default: () => options.placeholder,
      baseURL: runtimeConfig.public.API_BASE_URL,
      transform(data) {
        return data.data;
      },
      // body: filters.value,
      onRequest() {
        is_loading.value = true;
      },
      onResponse() {
        is_loading.value = false;
      },
      onResponseError({ response }) {
        is_loading.value = false;
      },
    });

    return {
      data,
      pending,
      refresh,
      execute,
      error,
      status,
    };
  };

  const fresh_fetch = async () => {

    const {
      data: inner_data,
    } = await fetch();

    data.value = inner_data.value;
  };

  const filter = async () => {
    await fresh_fetch();
  };

  const {
    data,
    pending,
    refresh,
    execute,
    error,
    status,
  } = await fetch();

  if (process.client) {
    options.onResponse(data.value);
  }

  if (error.value) {
    console.error(error.value);
  }

  return {
    data,
    filters,
    is_loading,
    refresh,
    has_error: error,
    status,
    fetch: fresh_fetch,
    filter,
  };
};

export default useServerFetch;
