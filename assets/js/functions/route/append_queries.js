function append_queries(inputs, route, router) {
  const queries = Object.assign({}, route.query);
  for (const [key, value] of Object.entries(inputs)) {
    queries[key] = value;
  }

  router.push({ query: queries });
}

export default append_queries;
