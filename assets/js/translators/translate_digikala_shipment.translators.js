function translate_digikala_shipment(meta_data) {
  switch (meta_data?.shipping_type) {
    case "seller" :
      return "ارسال توسط فروشنده";
    case "digikala":
      return "ارسال توسط دیجیکالا";
    case "both":
      return "ارسال دیجیکالا یا فروشنده";
  }
}

export default translate_digikala_shipment;
