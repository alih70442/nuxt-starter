const get_redirect_to = () => {
  const urlParams = new URLSearchParams(window.location.search);

  return urlParams.get("redirect_to");
};

const is_path_exist = (path, router) => {
  const all_routes = router.getRoutes();

  return Boolean(all_routes.find(r => r.path === path));
};

const handle_redirection = (default_route_name, router) => {
  const redirect_to = get_redirect_to();

  if (is_path_exist(redirect_to, router) && redirect_to) {

    router.push(redirect_to);
    return;
  }

  router.push({ name: default_route_name });
};

const pass_redirection = (next_route_name, router) => {
  const redirect_to = get_redirect_to();

  router.push({
    name: next_route_name,
    query: {
      redirect_to,
    },
  });
};

export {
  handle_redirection,
  pass_redirection,
};
