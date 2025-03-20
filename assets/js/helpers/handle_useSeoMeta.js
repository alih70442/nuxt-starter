const handle_useSeoMeta = (seo_obj) => {
  return {
    ...seo_obj,
    ...(seo_obj.description && {
      "og:description": seo_obj.description,
      "twitter:description": seo_obj.description,
    }),
  };
};

export default handle_useSeoMeta;
