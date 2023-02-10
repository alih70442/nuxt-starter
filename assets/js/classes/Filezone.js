import "@/assets/js/libs/simpleUpload";
import Base from "@/assets/js/classes/Base";

class FileZone extends Base {

  constructor(options = {}) {
    super(options);

    this.options = {
      selector: undefined,
      on_start: () => {
      },
      on_progress: () => {
      },
      on_success: () => {
      },
      on_error: () => {
      },
      on_cancel: () => {
      },
      on_delete: () => {
      }
    };
    this.options = Object.assign(this.options, options);

    this.input = this.selector.find(".js-fileZone__input");
    this.zone = this.selector.find(".js-fileZone__zone");
    this.result = this.selector.find(".js-fileZone__result");

    this.url = this.selector.attr("data-url") || "/uploads";
    this.data = JSON.parse(this.selector.attr("data-data") || "{}");
    this.extensions = this.convert_string_to_array(this.selector.attr("data-extensions") || "*");
    this.allowedTypes = this.convert_string_to_array(this.selector.attr("data-allowedTypes") || "*");
    this.maxFileSize = parseInt(this.selector.attr("data-maxFileSize")) || 0;

    this.alert = null;
    this.link = "";

    this.init();
    this.events();
  }

  init() {
  }

  events() {
    const obj = this;

    obj.input.on("change", function() {

      $(this).simpleUpload(obj.url, {

        allowedExts: obj.extensions,
        allowedTypes: obj.allowedTypes,
        maxFileSize: obj.maxFileSize * 1000, // byte
        data: obj.data,

        start: function(file) {
          obj.options.on_start(file, obj);

          this.block = $(`
                        <div class="t-fileZone__result-item d-flex justify-content-between align-items-center">
                            <div class="t-fileZone__name t-14 t-dark-passive js-fileZone__message">${file.name}</div>
                        </div>
                    `);
          this.progressBar_con = $(`
                        <div class="t-fileZone__progress">
                            <span class="t-fileZone__progress-bar js-fileZone__progress"></span>
                        </div>
                    `);
          this.progress = $(`
                        <span class="t-fileZone__progress-bar js-fileZone__progress"></span>
                    `);
          this.cancelButton = $(`
                        <button class="t-fileZone__close js-fileZone__close" type="button">
                            <i class="icon icon2-trash align-middle"></i>
                        </button>
                    `);
          this.commands_con = $(`
                        <div class="d-flex align-items-center"></div>
                    `);

          var that = this;

          this.cancelButton.on("click", function() {
            that.upload.cancel();
          });

          this.progressBar_con.append(this.progress);
          this.commands_con.append(this.cancelButton);
          this.block.append(this.progressBar_con).append(this.commands_con);

          obj.result.append(this.block);
        },

        progress: function(progress) {
          obj.options.on_progress(progress, obj);
          this.progress.width(progress + "%");
        },

        success: function(data) {
          obj.options.on_success(data, obj);

          this.progressBar_con.remove();
          this.cancelButton.remove();

          if (data.success) {
            // now fill the block with the format of the uploaded file
            var format = data.format;
            var formatDiv = $("<div class=\"format\"></div>").text(format);
            this.commands_con.before(formatDiv);
          } else {
            // our application returned an error
            var error = data.error;
            var errorDiv = $("<div class=\"t-fileZone__error text-danger text-left\"></div>").text(error);
            this.commands_con.before(errorDiv);
          }

          let download_link = "";

          if (obj.link !== "") {
            download_link = $(`<a href="${obj.link}" class="my-link ml-2 ml-sm-3"><i class="icon2-download align-middle"></i></a>`);
            this.commands_con.append(download_link);
            obj.download_link = "";
          }

          let delete_btn = $("<button type=\"button\" class=\"my-link js-fileZone__delete\"><i class=\"icon-trash align-middle\"></i></button>");
          this.commands_con.append(delete_btn);

          obj.show_success_miniAlert();

          delete_btn.on("click", function() {
            obj.options.on_delete();
          });
        },

        error: function(error) {
          obj.options.on_error(error, obj);

          this.progressBar_con.remove();
          this.cancelButton.remove();

          var error_message = error.message;

          switch (error.name) {
            case "InvalidFileExtensionError":
            case "InvalidFileTypeError":
              error_message = "فرمت فایل مجاز نیست";
              break;
            case "MaxFileSizeError":
              error_message = "اندازه فایل مجاز نیست";
              break;
            case "RequestError":
              error_message = "خطا در آپلود فایل";
              break;
            case "UnsupportedError":
              error_message = "مرورگرتان از این عمل پشتیبانی نمیکند";
              break;
            case "InternalError":
              error_message = "مشکلی در ارسال فایل پیش آمده است";
              break;

            default:
              error_message = "خطایی پیش آمده است";
              break;
          }

          var errorDiv = $("<div class=\"t-fileZone__error text-danger text-left\"></div>").text(error_message);
          let delete_btn = $("<button type=\"button\" class=\"my-link js-fileZone__delete\"><i class=\"icon-trash align-middle\"></i></button>");
          this.commands_con.before(errorDiv);
          this.commands_con.append(delete_btn);

          obj.show_fail_miniAlert();
        },

        cancel: function() {
          obj.options.on_cancel(obj);

          this.block.fadeOut(400, function() {
            $(this).remove();
          });
        }

      });

      // obj.selector.on('click', '.js-fileZone__delete', function () {
      //     if (typeof obj.alert !== 'undefined') {
      //         obj.hide_alert();
      //     }
      // });

    });

    obj.input.on("dragover", function(e) {
      e.preventDefault();

      obj.zone.addClass("t-fileZone__zone--dropping");
    });

    obj.input.on("drop dragleave", function() {
      obj.zone.removeClass("t-fileZone__zone--dropping");
    });
  }

  show_success_miniAlert() {
    this.selector.removeClass("t-fileZone--fail t-fileZone--success");
    this.selector.prepend(`
            <div class="d-flex justify-content-between rounded-1 my-bg-secondary-light px-3 py-2 mb-3 js-fileZone__miniAlert">
                <span class="t-success t-14">
                    <i class="icon2-tick-circle align-middle ml-2"></i>
                    آپلود فایل موفقیت آمیز بود.
                </span>
            </div>
        `);

    let $alert = this.selector.find(".js-fileZone__miniAlert");

    this.selector.addClass("t-fileZone--success");

    setTimeout(() => {
      $alert.fadeOut(function() {
        $(this).remove();
      });
      this.selector.removeClass("t-fileZone--success");
    }, 2000);
  }

  show_fail_miniAlert() {
    this.selector.removeClass("t-fileZone--fail t-fileZone--success");
    this.selector.prepend(`
            <div class="d-flex justify-content-between rounded-1 my-bg-primary-light px-3 py-2 mb-3 js-fileZone__miniAlert">
                <span class="t-danger t-14">
                    <i class="icon2-danger align-middle ml-2"></i>
                    متاسفانه فایل آپلود نشد.
                </span>
            </div>
        `);

    let $alert = this.selector.find(".js-fileZone__miniAlert");

    this.selector.addClass("t-fileZone--fail");

    setTimeout(() => {
      $alert.fadeOut(function() {
        $(this).remove();
      });
    }, 2000);
  }

  show_alert(html) {
    this.selector.append(`
            <div class="d-flex justify-content-between rounded-1 my-bg-primary-light px-3 py-2 mb-3 js-fileZone__alert">
                <span class="t-danger d-flex t-14">
                    <i class="icon2-danger align-middle ml-2 mt-1"></i>
                    ${html} akls;djfl
                </span>
            </div>
        `);

    this.alert = this.selector.find(".js-fileZone__alert");
  }

  hide_alert() {
    if (this.alert !== null) {
      this.alert.fadeOut(function() {
        $(this).remove();
      });
    }
  }

  create_item(fileName) {
    this.result.append(`
        <div class="t-fileZone__result-item d-flex justify-content-between align-items-center">
            <div class="t-fileZone__name t-14 t-dark-passive js-fileZone__message">${fileName}</div>
            <button type="button" class="my-link js-fileZone__delete"><i class="icon2-trash  align-middle"></i></button>
        </div>
    `);
  }

  hide_zone() {
    this.zone.hide();
  }

  show_zone() {
    this.zone.show();
  }

  disable_zone() {
    this.selector.addClass("t-fileZone--disabled");
    this.input.prop("disabled", true);
  }

  enable_zone() {
    this.selector.removeClass("t-fileZone--disabled");
    this.input.prop("disabled", false);
  }

  set_start_cb(cb) {
    this.options.on_start = cb;
  }

  set_progress_cb(cb) {
    this.options.on_progress = cb;
  }

  set_success_cb(cb) {
    this.options.on_success = cb;
  }

  set_error_cb(cb) {
    this.options.on_error = cb;
  }

  set_cancel_cb(cb) {
    this.options.on_cancel = cb;
  }

  set_delete_cb(cb) {
    this.options.on_delete = cb;
  }

  set_link(link) {
    this.link = link;
  }

  convert_string_to_array(input_str) {
    return input_str != "*" ? input_str.split(",") : [];
  }

  static create(options = {}) {
    return new FileZone(options);
  }

  static instances() {

    make_instances();

    $(document).ajaxSuccess(function() {
      make_instances();
    });

    function make_instances() {

      const elements = $(document).find("[data-component='FileZone']");
      elements.each(function() {

        if (!FileZone.is_selector($(this)))
          FileZone.create({
            selector: $(this)
          });
      });
    }
  }
}

export default FileZone;
