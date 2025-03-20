import { computed, ref } from "vue";
import cloneDeep from "lodash/cloneDeep.js";
import CARTOONS from "assets/js/consts/cartons.const";
import SEND_PRICES_BY_WEIGHT from "assets/js/consts/sendPrices.const";

const PACKING_PRICE = 20000; // toman
const MIN_PAYMENT_AMOUNT = 1000000; // toman

const useCalcCart = (cart, ref_send_method) => {
  const products = ref(CARTOONS);

  const products_price = computed(() => {
    return cart.value.reduce((total, curr_order) => {
      const found_product = products.value.find(p => p.id === curr_order.id);
      return total + (curr_order.amount * (found_product.$price));
    }, 0);
  });

  const products_weight = computed(() => {
    const copied_cart = cloneDeep(cart.value);

    copied_cart.forEach((product, index) => {
      const found_product = CARTOONS.find(p => p.id === product.id);
      copied_cart[index].weight = found_product.weight;
    });

    return copied_cart.reduce((total, item) => total + item.amount * item.weight, 0) / 1000;
  });

  const packages_count = computed(() => {
    return Math.ceil(products_weight.value / 20 + products_weight.value / 20 * 5 / 100);
  });

  const single_package_weight = computed(() => {
    return products_weight.value / packages_count.value;
  });

  const packaging_price = computed(() => {
    if (!ref_send_method) return 0;

    if (ref_send_method.value.value === 1) return 0;

    return packages_count.value * PACKING_PRICE;
  });

  const send_price = computed(() => {
    if (!ref_send_method) return 0;

    if (ref_send_method.value.value === 1) return 0;

    const package_step = Math.ceil(single_package_weight.value);

    return packages_count.value * SEND_PRICES_BY_WEIGHT[package_step];
  });

  const total_price = computed(() => {
    return products_price.value + send_price.value + packaging_price.value;
  });

  const payment_progress_percent = computed(() => {
    return products_price.value / MIN_PAYMENT_AMOUNT * 100;
  });

  const payment_loss_amount = computed(() => {
    return Math.min(MIN_PAYMENT_AMOUNT - products_price.value);
  });

  const is_min_payment_reached = computed(() => {
    return payment_progress_percent.value >= 100;
  });

  return {
    products_price,
    send_price,
    packaging_price,
    total_price,
    payment_progress_percent,
    payment_loss_amount,
    is_min_payment_reached,
  };
};

export default useCalcCart;
