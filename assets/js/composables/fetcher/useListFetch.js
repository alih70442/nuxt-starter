import { computed, onMounted, ref } from "vue";
import useFetch2 from "@/assets/js/composables/fetcher/useFetch.js";
import inputs_to_key_value from "@/assets/js/translators/inputs_to_key_value.translator.js";
import get_response_data from "@/assets/js/helpers/get_response_data";

const useListFetch = (request_handler, options) => {
  options = Object.assign({
    placeholder: {
      list: [],
      total: 0,
    },
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

  const filters = ref({
    skip: {
      value: 0,
      default: 0,
    },
    take: {
      label: "تعداد در صفحه",
      default: 20,
      value: 20,
    },
    search: {
      value: "",
      default: "",
    },
    ...options.filters,
  });

  const isLoadmoreDone = computed(() => {
    return data.value.total <= filters.value.skip.value + filters.value.take.value;
  });

  const {
    has_error,
    data,
    is_loading,
    fetch: fetch_handler,
  } = useFetch2(request_handler, { ...options, manual: true });

  const fetch = (params = {}) => {
    filters.value.skip.value = 0;

    Object.entries(params).forEach(([key, value]) => {
      if (key in filters.value)
        filters.value[key].value = value;
      else {
        filters.value[key] = {};
        filters.value[key].value = value;
      }
    });

    return fetch_handler(inputs_to_key_value(filters.value));
  };

  const loadMore = () => {
    filters.value.skip.value += filters.value.take.value;

    request_handler(inputs_to_key_value(filters.value)).then(rs => {
      const rs_data = get_response_data(rs);

      data.value.total = rs_data.total;
      data.value.list = [...data.value.list, ...rs_data.list];
    }).finally(() => {

      is_loading.value = false;
    }).catch(() => {

      has_error.value = true;
    });
  };

  const paginate = (page_num) => {
    filters.value.skip.value = (page_num - 1) * filters.value.take.value;

    return fetch_handler(inputs_to_key_value(filters.value));
  };

  const change_per_page = (perPage) => {
    filters.value.take.value = perPage;
    filters.value.take.default = perPage;

    return fetch_handler(inputs_to_key_value(filters.value));
  };

  const filter = () => {
    filters.value.skip.value = filters.value.skip.default;
    filters.value.take.value = filters.value.take.default;

    return fetch_handler(inputs_to_key_value(filters.value));
  };

  onMounted(() => {
    if (!options.manual)
      fetch(inputs_to_key_value(filters.value));
  });

  return {
    data,
    has_error,
    is_loading,
    filters,
    isLoadmoreDone,
    fetch,
    filter,
    loadMore,
    paginate,
    change_per_page,
  };
};

export default useListFetch;
