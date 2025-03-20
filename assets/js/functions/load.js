function load_options(input_obj, promise, data = {}) {
  return new Promise((resolve) => {
    input_obj.loading = true;
    promise(data.cb_input).then((rs) => {
      input_obj.options = rs;
      input_obj.loading = false;
      resolve(rs);
    });
  });
}

async function set_btn_loading(btn, promise, data = {}) {
  if (!btn) return promise(data.cb_data);

  btn = btn.closest("button");
  btn.classList.add("c-btn--loading", "p-loading", "p-loading--center");
  if (data.bg_white)
    btn.classList.add("p-loading--bgWhite");
  return promise(data.cb_data).finally(() => {
    btn.classList.remove("c-btn--loading", "p-loading", "p-loading--center", "p-loading--bgWhite");
  }).catch((err) => {
    btn.classList.remove("c-btn--loading", "p-loading", "p-loading--center", "p-loading--bgWhite");
    throw err;
  });
}

function unset_btn_loading(btn_selector) {
  btn_selector.classList.remove("");
}

export {
  load_options,
  set_btn_loading,
  unset_btn_loading,
};
