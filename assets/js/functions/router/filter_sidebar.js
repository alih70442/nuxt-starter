function filter_sidebar(route_group) {
  if (typeof (route_group) === "object") {
    return route_group.filter((route, index) => {
      return !route.meta.sidebar_hidden;
    });
  }
}

export default filter_sidebar;
