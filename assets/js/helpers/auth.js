import { useUserStore } from "@/stores/StoreUser";
import { axiosClient, set_token } from "../network/axios_init";
import router from "../../../router";
import Caching from "@/assets/js/classes/Caching";
import { KEY_ACCESS_TOKEN, KEY_REDIRECT_ORIGIN, KEY_REFRESH_TOKEN, KEY_USER_HASH_ID } from "@/assets/js/consts/storageKeys.const";
import { SimpleStorage } from "@/assets/js/classes/Storage.js";
import { useAppStore } from "@/stores/StoreApp.js";
import { logout_user } from "@/assets/js/api/auth.api.js";
import get_response_data from "@/assets/js/helpers/get_response_data";
import { get_active_role, set_active_role } from "@/assets/js/helpers/get_active_role";
import RoleEnum from "@/assets/js/consts/roles.const";
import mapRoutes from "@/assets/js/mappers/mapRoutes";

const is_pwa = () => {
  return Boolean(
    (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches)
    || window.navigator.standalone,
  );
};

const is_twa = () => {
  return document.referrer.includes("android-app://");
};

const get_device_type = () => {
  if (is_twa()) return "twa";

  if (is_pwa()) return "pwa";

  return "web";
};

const get_creation_tags = () => {

  try {
    const creation_tag = SimpleStorage.getItem(KEY_REDIRECT_ORIGIN);
    const app = creation_tag?.app ? encodeURI(creation_tag.app) : get_device_type();

    return JSON.stringify({
      app,
      ...(creation_tag?.landing_url && { landing_url: encodeURI(creation_tag.landing_url) }),
      ...(creation_tag?.utm_campaign && { utm_campaign: encodeURI(creation_tag.utm_campaign) }),
      ...(creation_tag?.utm_medium && { utm_medium: encodeURI(creation_tag.utm_medium) }),
      ...(creation_tag?.utm_source && { utm_source: encodeURI(creation_tag.utm_source) }),
    });
  } catch (error) {
    console.error(error);
    console.error("Login Otp creation tag error");

    return false;
  }
};

function auth_user(rs) {
  const rs_data = get_response_data(rs);

  const access_token = rs_data.access_token;
  const refresh_token = rs_data.refresh_token;

  localStorage.setItem(KEY_ACCESS_TOKEN, access_token);
  localStorage.setItem(KEY_REFRESH_TOKEN, refresh_token);

  set_token(access_token);
}

function logout() {

  return logout_user().finally(() => {

    make_logout();
  }).catch(() => {

    make_logout();
  });
}

function make_logout() {
  const userStore = useUserStore();
  userStore.make_empty();
  delete axiosClient.defaults.headers.common["authorization"];

  localStorage.removeItem(KEY_USER_HASH_ID);
  localStorage.removeItem(KEY_ACCESS_TOKEN);
  localStorage.removeItem(KEY_REFRESH_TOKEN);
  Caching.bust_caches();

  useAppStore().set_pending_statistics(0);
  useAppStore().set_preparing_statistics(0);
  useAppStore().set_ready_statistics(0);
  useAppStore().set_sent_statistics(0);
  useAppStore().set_cancel_statistics(0);

  router.push({ name: "login" });
}

function is_auth() {
  return localStorage.getItem(KEY_ACCESS_TOKEN) !== null;
}

export {
  auth_user,
  make_logout,
  is_auth,
  logout,
  get_creation_tags,
};