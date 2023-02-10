function translate_gateway_metadata(key, meta_data) {
  switch (key) {
    case "tax" :
    case "Tax" :
      return meta_data?.Tax ?? meta_data?.tax;
    case "TotalPrice":
    case "deliveryCost":
      return meta_data?.TotalPrice ?? meta_data?.deliveryCost;
  }
}

export default translate_gateway_metadata;
