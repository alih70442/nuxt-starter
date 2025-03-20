import cloneDeep from "lodash/cloneDeep";

function resource(keys, params) {
  const copied_params = cloneDeep(params);
  for (const param in copied_params) {
    if (!keys.includes(param))
      delete copied_params[param];
  }
  return copied_params;
}

function resourceBulk(keys, params) {
  const copied_bulk = cloneDeep(params);
  for (const params of copied_bulk) {
    for (const param in params) {
      if (!keys.includes(param))
        delete params[param];
    }
  }
  return copied_bulk;
}

export {
  resource,
  resourceBulk,
};
