import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useRequest } from "vue-request";
import cloneDeep from "lodash/cloneDeep";
import perPage from "@/assets/js/inputs/input/perPage.input";
import inputs_to_key_value from "@/assets/js/translators/inputs_to_key_value.translator.js";
import get_response_data from "@/assets/js/helpers/get_response_data.js";

function useStaledFetch(request_handler, cache_name, options = {}) {
  options = Object.assign({
    fetcher_params: {
      manual: false,
    },
    request_params: {},
    filters: {},
    on_fetched: (fetched_data) => {
    },
    on_after_fetch: (fetched_data) => {
    },
  }, options);

  const table_loading = ref(false);
  const route = useRoute();
  const filters = ref({
    page: {
      value: 1,
    },
    search: {
      value: "",
    },
    count: Object.assign(perPage, { label: "تعداد نتایج لیست" }),
    ...options.filters,
  });

  const is_loading = computed(() => {
    return table_loading.value || fetch_loading.value;
  });

  const set_loading = (state) => {
    table_loading.value = state;
  };

  const fetch = async (new_params = {}) => {
    let params = cloneDeep(new_params);

    set_loading(true);

    params = Object.assign({}, inputs_to_key_value(filters.value), params);

    const records = await request_handler(params).then((rs) => {
      const records = get_response_data(rs);

      if (!records.list?.length && filters.value?.page > 1) {
        return fetch(params);
      }
      return records;
    }).finally(() => {
      set_loading(false);
    });
    options.on_fetched(records);
    return records;
  };

  const {
    data: records,
    loading: fetch_loading,
    mutate: mutate_records,
    run: run_records,
    error: has_error,
  } = useRequest(fetch, {
    initialData: {
      list: [],
      total: 0,
    },
    cacheKey: cache_name,
    ...options.fetcher_params,
    onAfter: () => {
      options.on_after_fetch(records.value);
    },
  });

  const load_more = () => {
    filters.value.page++;
    fetch({ page: filters.value.page }).then((rs) => {
      mutate_records({ list: records.value.list.concat(rs.list), total: rs.total });
    });
  };

  const filter = (new_filter) => {
    fetch({ ...new_filter }).then((rs) => {
      mutate_records(rs);
    });
  };

  const change_page = (page_num) => {
    filters.value.page.value = page_num;

    filter();
  };

  const change_per_page = (perPage) => {
    filters.value.count.value = perPage;

    filter();
  };

  return {
    fetch,
    load_more,
    filter,
    set_loading,
    change_page,
    change_per_page,
    run_records,
    filters: filters.value,
    mutate_records,
    has_error,
    is_loading,
    records,
    route,
    run: run_records,
  };
}

export default useStaledFetch;
