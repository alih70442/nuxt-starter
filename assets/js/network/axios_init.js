import axios from "axios";
import show_api_message from "assets/js/helpers/show_api_message";
import { is_response_ok } from "assets/js/network/helpers.network";
import { ROUTE_BASE } from "assets/js/consts/publicRoutes.consts.js";
import useToast from "assets/js/composables/layout/useToast.js";

// const AXIOS_TIMEOUT = 60000;
let axiosClient = axios.create({
  baseURL: ROUTE_BASE,
  // timeout: AXIOS_TIMEOUT,
  headers: {
    // "authorization": localStorage.getItem("access-token") ?? "",
    "X-Currency": "IRT", // IRT | IRR
  },
});

axiosClient.interceptors.response.use(
  function (response) {
    show_api_message(response);

    if (!response.config?.__silent) {
      show_api_message(response);
    }

    if (!is_response_ok(response)) throw response;

    return response;
  },
  async function (error) {
    let response = error.response;

    const error_code = error.toJSON().code;
    if (error_code === "ECONNABORTED") {
      useToast().create_danger("پاسخی از سمت سرور دریافت نشد.");
    }
    if (error_code === "ERR_NETWORK") {
      useToast().create_danger("امکان برقراری ارتباط با سرور وجود ندارد.");
    } else {
      if (!response.config?.__silent) {
        show_api_message(response);
      }
    }

    // const originalRequest = error.config;
    // if ([401, 422].includes(error.response.status) && !originalRequest._retry) {
    //   originalRequest._retry = true;
    //   const rs = await refresh_token();
    //
    //   const data = rs.data.data;
    //   const token = "Bearer " + data.access_token;
    //
    //   auth_user(rs);
    //
    //   originalRequest.headers[
    //     "authorization"
    //     ] = token;
    //
    //   return axiosClient(originalRequest);
    // }

    // if (response?.status === 401) {
    // make_logout();
    // }

    throw error;
  },
);

function set_token(token) {
  axiosClient = axios.create({
    baseURL: ROUTE_BASE,
    // timeout: AXIOS_TIMEOUT,
    // headers: {
    //   "authorization": token
    // }
  });
}

export { axiosClient, set_token };
