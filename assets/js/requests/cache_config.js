import Caching from "assets/js/classes/Caching";
import { fetch_config } from "assets/js/api/app.api";
import { is_response_ok } from "assets/js/network/helpers.network";

const cache_config = async () => {
  await fetch_config().then(rs => {
    if (!is_response_ok(rs)) return;

    const config_data = rs.data.data;
    Object.entries(config_data).forEach(([key, value]) => {
      Caching.cache_now(key, value);
    });
  });
};

export default cache_config;
