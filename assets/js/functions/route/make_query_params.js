import qs from "qs";

function make_query_params(params) {
  return "?" + qs.stringify(params, { encode: false });
}

export default make_query_params;
