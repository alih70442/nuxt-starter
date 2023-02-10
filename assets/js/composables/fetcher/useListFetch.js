import { ref, computed, onMounted } from "vue";
import useFetch from "@/assets/js/composables/fetcher/useFetch.js";

const useListFetch = (request_handler, options) => {
  options = Object.assign({
    placeholder: {
      list: [],
      total: 0,
    },
    params: {},
    manual: false,
  }, options);

  const page = ref(1);
  const count = ref(20);

  const computed_params = computed(() => {
    return Object.assign({}, options.params, {
      count: count.value,
      page: page.value,
    });
  });

  const {
    has_error,
    data,
    is_loading,
    fetch,
  } = useFetch(request_handler, { ...options });

  const loadMore = () => {
    page.value++;
    fetch({ page: page.value }).then((rs) => {
      data.value.total = rs.total;
      data.value.list = records.value.list.concat(rs.list);
    });
  };

  const paginate = () => {
  };

  return {
    data,
    has_error,
    is_loading,
    params: computed_params,
    fetch,
    loadMore,
    paginate,
  };
};

export default useListFetch;
