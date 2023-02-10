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
  btn = btn.closest("button");
  btn.classList.add("p-loading", "p-loading--center");
  return await new Promise((resolve) => {
    promise(data.cb_data).then((rs) => {
      resolve(rs);
    }).finally(() => {
      btn.classList.remove("p-loading", "p-loading--center");
    });
  });
}

function unset_btn_loading(btn_selector) {
  btn_selector.classList.remove("");
}

export {
  load_options,
  set_btn_loading,
  unset_btn_loading
};
