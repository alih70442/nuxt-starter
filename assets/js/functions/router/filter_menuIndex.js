function filter_menuIndex(route_group) {
  if (typeof (route_group) === "object") {
    return route_group.filter((route, index) => {
      return !route.meta.menuIndex_hidden;
    });
  }
}

export default filter_menuIndex;
