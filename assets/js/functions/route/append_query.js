function append_query(key, value, route, router) {
  const query = Object.assign({}, route.query);
  query[key] = value;
  router.push({ query });
}

export default append_query;
