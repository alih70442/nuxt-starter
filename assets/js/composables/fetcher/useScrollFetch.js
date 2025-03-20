import { computed, onMounted, ref } from "vue";
import useFetch2 from "@/assets/js/composables/fetcher/useFetch.js";
import inputs_to_key_value from "@/assets/js/translators/inputs_to_key_value.translator.js";
import { APP_OPTION_PER_PAGE } from "@/assets/js/consts/AppOptions.const.js";
import get_response_data from "@/assets/js/helpers/get_response_data.js";
import uniqBy from "lodash/uniqBy";

const useScrollFetch = (request_handler, options) => {
  options = Object.assign({
    placeholder: {
      list: [],
      total: 0,
    },
    unique_key: "id",
    filters: {},
    active_filters: [],
    manual: false,
    has_archive: false,
    onFetch: (data) => {
      return data;
    },
  }, options);

  const has_tail_reached = ref(false);


  const filters = ref({
    skip: {
      value: 1,
    },
    take: {
      value: APP_OPTION_PER_PAGE,
    },
    search: {
      value: "",
    },
    is_search: {
      value: false,
    },
    ...options.filters,
  });

  const has_filter = computed(() => {
    return Object.values(filters.value).some(f => f.active && (Array.isArray(f.value) ? f.value.length : f.value));
  });

  const {
    has_error,
    data,
    is_loading,
    fetch: fetch_handler,
  } = useFetch2(request_handler, { ...options, manual: true });

  const reset_options = () => {
    has_tail_reached.value = false;
    filters.value.skip.value = filters.value.take.value;
    filters.value.is_search.value = false;
  };

  const fetch = (params = {}) => {
    Object.entries(params).forEach(([key, value]) => {
      if (key in filters.value)
        filters.value[key].value = value;
    });

    return filter();
  };

  const filter = () => {
    reset_options();

    if (has_filter.value) {
      filters.value.is_search.value = true;
    }

    return fetch_handler(inputs_to_key_value(filters.value)).then(rs_data => {

      if (rs_data.list.length < APP_OPTION_PER_PAGE) {
        has_tail_reached.value = true;
      }

      data.value.list = uniqBy(data.value.list, options.unique_key);

      return rs_data;
    });
  };

  const load_more = () => {
    has_error.value = false;
    is_loading.value = true;
    filters.value.skip.value += filters.value.take.value;

    request_handler(inputs_to_key_value(filters.value)).then(rs => {
      const rs_data = get_response_data(rs);

      data.value.list = [...data.value.list, ...rs_data.list];
      data.value.list = uniqBy(data.value.list, options.unique_key);

      if (rs_data.list.length < APP_OPTION_PER_PAGE) {

        if (options.has_archive) {

          if (filters.value.is_search.value) {
            has_tail_reached.value = true;
          }

          filters.value.skip.value-= filters.value.take.value;
          filters.value.is_search.value = true;

          return;
        }

        has_tail_reached.value = true;
      }

      return data.value;
    }).finally(() => {

      is_loading.value = false;
    }).catch(() => {

      has_error.value = true;
    });
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
    is_finished: has_tail_reached,
    fetch,
    filter,
    load_more,
  };
};

export default useScrollFetch;
