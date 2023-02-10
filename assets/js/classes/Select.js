import Base from "@/assets/js/classes/Base";

class Select extends Base {

  constructor(options = {}) {
    super(options);

    this.init();
    this.events();
  }

  init() {
    this.$select = this.selector.children(".js-select__select");
    this.$toggler = this.selector.children(".js-select__toggler");
    this.$label = this.$toggler.children(".js-select__label");
    this.$menu = this.selector.children(".js-select__menu");
    this.$items = this.$menu.children(".js-select__items");

    this.is_searchable = Boolean(this.selector.attr("data-searchable")) || false;

    this.$input = null;

    this.init_options();
  }

  events() {
    var obj = this;

    obj.$toggler.on("click", function(e) {
      e.stopPropagation();

      if (obj.$toggler.hasClass("show"))
        obj.close();
      else
        obj.open();

      Select.hide_all(obj.selector);
    });

    obj.$menu.on("click", ".js-select__item", function(e) {
      e.stopPropagation();

      const $option = $(this);
      const value = $option.attr("data-value");
      const text = $option.text();

      obj.$menu.children(".js-select__item").removeClass("selected");
      $option.addClass("selected");

      obj.$toggler.addClass("selected");

      obj.set_label(text);
      obj.$select.val(value);
      obj.$select.trigger("change");

      obj.close();
    });

    if (this.is_searchable) {
      obj.$input = obj.$menu.children(".js-select__search");

      obj.$input.on("click", function(e) {
        e.stopPropagation();
      });

      obj.$input.on({

        keyup: function() {

          obj.$items.children(".js-select__rs").remove();

          var item_found_count = 0;

          // first show all
          obj.$items.children(".js-select__item").removeClass("d-none");

          obj.$items.children(".js-select__item").each(function() {
            const item_text = $(this).text();

            if (item_text != "")
              if (item_text.indexOf(obj.$input.val()) == -1)
                $(this).addClass("d-none");
              else
                item_found_count++;
          });

          if (item_found_count == 0) {
            obj.$items.append("<div class=\"c-select__item clr-light-300 disabled js-select__rs\">موردی یافت نشد!</div>");
          }
        }
      });
    }
  }

  close() {
    var obj = this;

    this.$toggler.removeClass("show");
    this.$menu.removeClass("show");
    this.reset_search();
  }

  open() {
    var obj = this;

    this.$toggler.addClass("show");
    this.$menu.addClass("show");

    if (this.is_searchable) {
      setTimeout(() => {
        this.$input.trigger("focus");
      }, 0);
    }
  }

  reset_search() {
    if (this.is_searchable) {
      this.$input.val("");
      this.$items.children(".js-select__item").removeClass("d-none");
      this.$items.children(".js-select__rs").remove();
    }
  }

  init_options() {
    var obj = this;

    const $options = this.$select.children("option");
    let new_options_html = "";
    $options.each(function() {
      const $option = $(this);
      const text = $option.text();
      const value = $option.attr("value");

      let class_selected = "";
      if ($option.attr("selected")) {
        obj.set_label(text);
        class_selected = " selected";
      }
      const class_disabled = $option.attr("disabled") ? " disabled" : "";

      new_options_html += `
        <div class="c-select__item js-select__item${class_selected}${class_disabled}" data-value="${value}">
            ${text}
        </div>
      `;
    });

    this.$items.html(new_options_html);
  }

  set_label(text) {
    this.$label.text(text);
  }

  static create(options = {}) {
    return new Select(options);
  }

  static instances() {

    make_instances();

    $(document).ajaxSuccess(function() {
      make_instances();
    });

    function make_instances() {

      const elements = $(document).find("[data-component='Select']");
      elements.each(function() {

        if (!Select.is_selector($(this)))
          Select.create({
            selector: $(this)
          });
      });
    }
  }

  static click_document() {
    $(document).on("click", function() {
      Select.hide_all(null);
    });
  }

  static hide_all(not_this) {
    const others = $(".js-select").not(not_this);

    others.each(function() {

      $(this).find(".js-select__toggler").removeClass("show");
      $(this).find(".js-select__menu").removeClass("show");
    });
  }
}

Select.click_document();

export default Select;
