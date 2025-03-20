function sort_routes(routes) {
  return routes.sort((a, b) => {
    if (!a.menu_index) a.menu_index = 50;
    if (!b.menu_index) b.menu_index = 50;
    return a.menu_index - b.menu_index;
  });
}

export default sort_routes;
