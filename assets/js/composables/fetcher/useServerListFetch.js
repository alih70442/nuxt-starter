import { onBeforeUnmount, onMounted, ref } from "vue";
import { APP_OPTION_LIST_RECORD_COUNT } from "assets/js/consts/AppOptions.const.js";
import { useCookie, useFetch } from "nuxt/app";
import inputs_to_key_value from "assets/js/translators/inputs_to_key_value.translator.js";
import make_bearer_token from "assets/js/functions/api/make_bearer_token.js";
import { KEY_ACCESS_TOKEN } from "assets/js/consts/storageKeys.const.js";

const useServerListFetch = async (request_url, options) => {
  options = Object.assign(
    {
      placeholder: {
        list: [],
        total: 0,
      },
      filters: {},
      in_load: false,

      server: true,
      watch: false,
      onResponse() {
      },
    },
    options,
  );

  const runtimeConfig = useRuntimeConfig();
  const token = useCookie(KEY_ACCESS_TOKEN);
  const is_loading = ref(options.server ? false : options.in_load);
  const filters = ref({
    skip: {
      value: 0,
    },
    take: {
      value: APP_OPTION_LIST_RECORD_COUNT,
    },
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
        window.addEventListener("scroll", handle_scroll);

        is_loading.value = true;
      },
      onResponse({ response }) {
        options.onResponse(response._data.data);
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
    filters.value.skip.value = 0;

    window.addEventListener("scroll", handle_scroll);

    const {
      data: inner_data,
    } = await fetch();

    data.value = inner_data.value;
  };

  const filter = async () => {
    await fresh_fetch();
  };

  const handle_scroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {

      if (is_loading.value) return;

      if (filters.value.skip.value + APP_OPTION_LIST_RECORD_COUNT > data.value.total) {
        window.removeEventListener("scroll", handle_scroll);
      }

      load_more();
    }
  };

  const load_more = async () => {
    filters.value.skip.value += APP_OPTION_LIST_RECORD_COUNT;

    const {
      data: inner_data,
    } = await fetch();

    data.value.list = [...data.value.list, ...inner_data.value.list];

    if (data.value.list.length === data.value.total)
      window.removeEventListener("scroll", handle_scroll);
  };

  onMounted(() => {
    if (process.server) return;

    if (!data.value.list.length || data.value.list.length === data.value.total) return;

    window.addEventListener("scroll", handle_scroll);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("scroll", handle_scroll);
  });

  const {
    data,
    pending,
    refresh,
    execute,
    error,
    status,
  } = await fetch();

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

export default useServerListFetch;
