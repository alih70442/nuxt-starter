const get_base_url = () => {
  if (process.server) {
    return process.env.NUXT_API_BASE_URL;
  }

  const runtimeConfig = useRuntimeConfig();

  return runtimeConfig.public.API_BASE_URL;
};

export default get_base_url;
