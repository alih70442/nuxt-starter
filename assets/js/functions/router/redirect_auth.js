import { is_auth } from "@/assets/js/helpers/auth.js";
import { set_token } from "@/assets/js/network/axios_init";
import { KEY_ACCESS_TOKEN } from "@/assets/js/consts/storageKeys.const";

function redirect_auth(to, from, next) {
  const query_token = to.query.token ?? to.query.t;
  const redirect_to = to.query.redirect_to;

  if (query_token) {
    localStorage.setItem(KEY_ACCESS_TOKEN, query_token);

    set_token(query_token);

    if (redirect_to) {
      const redirect_to = to.fullPath.split("redirect_to=").pop();
      next(redirect_to);
      return;
    }

    next({ name: "dashboard" });
    return;
  }

  if (is_auth()) {
    if (to.name === "dashboard")
      next();
    else
      next({ name: "dashboard" });
  } else {
    if (LOGIN_ZONE_ROUTE_NAMES.includes(to.name))
      next();
    else
      next({ name: "login" });
  }
}

export default redirect_auth;