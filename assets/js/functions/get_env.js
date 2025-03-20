const get_env = (env_name) => {
  return process.server ? useRuntimeConfig()[env_name] : useRuntimeConfig().public[env_name];
};

export default get_env;
