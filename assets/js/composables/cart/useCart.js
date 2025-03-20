import { computed, onMounted } from "vue";
import { SimpleStorage } from "assets/js/classes/Storage.js";
import { KEY_CART_PRODUCTS } from "assets/js/consts/storageKeys.const.js";
import { useAppStore } from "~/store/StoreApp.js";
import make_query_params from "assets/js/functions/route/make_query_params.js";
import copy_clipboard from "assets/js/functions/copy_clipboard.js";
import useToast from "assets/js/composables/layout/useToast.js";
import qs from "qs";
import useListFetch from "assets/js/composables/fetcher/useListFetch.js";
import { index_product_variations } from "assets/js/api/productVariation.api.js";
import useFetch from "assets/js/composables/fetcher/useFetch.js";
import { show_store } from "assets/js/api/store.api.js";

const useCalcCart = (store_slug = null) => {
  const appStore = useAppStore();

  const cart = computed(() => {
    return appStore.cart;
  });

  const cart_total_quantity = computed(() => {
    return appStore.cart.reduce((acc, p) => acc + p.quantity, 0);
  });

  const variations_count = computed(() => {
    return cart.value.reduce((acc, p) => acc + p.quantity, 0);
  });

  const products_price = computed(() => {
    return cart_product_variations.value.reduce((acc, pv) => acc + cart.value.find(cp => cp.id === pv.id).quantity * pv.$price, 0);
  });

  const total_price = computed(() => {
    return products_price.value + data_store.value.$send_price;
  });

  const {
    data: data_product_variations,
    has_error: has_error_product_variations,
    is_loading: is_loading_product_variations,
    filters: filters_product_variations,
    isLoadmoreDone: isLoadmoreDone_product_variations,
    fetch: fetch_product_variations,
    filter: filter_product_variations,
    loadMore: loadMore_product_variations,
    paginate: paginate_product_variations,
    change_per_page: change_per_page_product_variations,
  } = useListFetch(index_product_variations, {
    manual: true,
    onError() {
      console.log("errored");

      clearCart();
    },
  });

  const {
    data: data_store,
    has_error: has_error_store,
    is_loading: is_loading_store,
    filters: filters_store,
    fetch: fetch_store,
  } = useFetch(show_store, {
    manual: true,
  });

  const cart_product_variations = computed(() => {
    return data_product_variations.value.list.filter(p => cart.value.find(cp => cp.id === p.id)?.quantity > 0);
  });

  const is_cart_ok = (cart) => {
    return cart.every(p => !isNaN(p.id) && !isNaN(p.quantity));
  };

  const save_cart = () => {
    SimpleStorage.setItem(KEY_CART_PRODUCTS, appStore.cart);
  };

  const addToCart = (product_variation_id) => {
    const found_product_index = appStore.cart.findIndex(p => p.id === product_variation_id);

    if (found_product_index !== -1) {
      appStore.cart[found_product_index].quantity++;
    } else {
      appStore.cart.push({
        id: product_variation_id,
        quantity: 1,
      });
    }

    save_cart();
  };

  const minusFromCart = (product_variation_id) => {
    const found_product_index = appStore.cart.findIndex(p => p.id === product_variation_id);

    if (found_product_index === -1) return;

    appStore.cart[found_product_index].quantity--;

    if (appStore.cart[found_product_index].quantity <= 0) {
      appStore.cart = appStore.cart.filter(p => p.id !== product_variation_id);
    }

    save_cart();
  };

  const setToCart = (product_variation_id, quantity) => {
    const found_product_index = appStore.cart.findIndex(p => p.id === product_variation_id);

    if (found_product_index !== -1) {
      appStore.cart[found_product_index].quantity = quantity;

      if (appStore.cart[found_product_index].quantity <= 0) {
        appStore.cart = appStore.cart.filter(p => p.id !== product_variation_id);
      }

    } else {
      appStore.cart.push({
        id: product_variation_id,
        quantity,
      });
    }

    save_cart();
  };

  const clearCart = () => {
    appStore.cart = [];

    save_cart();
  };

  const copyCart = () => {
    const query_string = make_query_params({
      cart: cart.value,
    });

    const share_link = window.location.origin + window.location.pathname + query_string;

    if (copy_clipboard(share_link))
      useToast().create_success("سبد خرید با موفقیت کپی شد");
  };

  const loadCart = (cart_items) => {

    for (const item of cart_items) {
      setToCart(+item.id, +item.quantity);
    }
  };

  onMounted(() => {
    if (appStore.is_cart_loaded) return;

    try {
      const query_params = qs.parse(window.location.search);

      if (is_cart_ok(query_params?.cart ?? []) && query_params?.store_slug) {
        appStore.cart = query_params.cart.map(p => ({
          id: +p.id,
          quantity: +p.quantity,
        }));

        save_cart();
      } else {
        const cart = SimpleStorage.getItem(KEY_CART_PRODUCTS) ?? [];

        if (is_cart_ok(cart)) {
          appStore.cart = cart;
        }
      }

    } catch (err) {
      console.log(err);

      save_cart();

      clearCart();
    }

    appStore.is_cart_loaded = true;
  });

  return {
    cart,
    variations_count,
    cart_total_quantity,
    products_price,
    total_price,
    cart_product_variations,
    is_loading_product_variations,
    data_store,
    fetch_product_variations,
    fetch_store,
    addToCart,
    minusFromCart,
    setToCart,
    clearCart,
    copyCart,
    loadCart,
  };
};

export default useCalcCart;
