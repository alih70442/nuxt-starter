class Subcat {
    constructor(subcat) {
        this.subcat = $(subcat);
        this.label = this.subcat.children(class_subcat_label);
        this.container = this.subcat.children(class_subcat_con);

        this.items = [];

        this.active = false;
        this.is_container_open = false;

        this.#init_items();
        this.#events();
    }

    #init_items() {
        const obj = this;

        this.items = this.subcat.children(class_subcat_con).find(class_item);
    }

    #events() {
        const obj = this;

        if (is_mobile_size()) {

            obj.label.on('click', function (e) {

                if (is_touch()) {
                    e.preventDefault();
                }

                // for (const subcat of obj.subcats) {
                //     subcat.hide_container();
                // }

                obj.toggle_container();

                // obj.subcats[0].activate();
                // obj.subcats[0].show_container();
            });
        }
        else {

            obj.label.on('click', function (e) {

                if (is_touch()) {
                    e.preventDefault();
                }
            });

            obj.subcat.on('mouseenter touchstart', function (e) {
                e.stopPropagation()

                Subcat.deactivate_all();
                obj.activate();
                Subcat.hide_all_containers();
                obj.show_container();
            });

            obj.subcat.on('mouseleave', function () {
                // obj.hide_container();
            });

            $('body').on('touchstart', function () {
                obj.hide_container();
            });
        }
    }

    show() {
        this.subcat.show();
    }

    hide() {
        this.subcat.hide();
    }

    show_container() {
        if (is_mobile_size())
            this.container.slideDown();
        else
            this.container.show();
        this.subcat.addClass('show');
        this.label.addClass('show');
        this.is_container_open = true;
    }

    hide_container() {
        if (is_mobile_size())
            this.container.slideUp();
        else
            this.container.hide();
        this.subcat.removeClass('show');
        this.label.removeClass('show');
        this.is_container_open = false;
    }

    toggle_container() {
        if (this.is_container_open)
            this.hide_container();
        else
            this.show_container();
    }

    activate() {
        this.subcat.addClass(class_subcat_active);
        // this.is_active = true;
    }

    deactivate() {
        this.subcat.removeClass(class_subcat_active);
        // this.is_active = false;
    }

    gg() {
        return this.active;
    }

    static deactivate_all() {
        // $(class_subcat).removeClass(class_subcat_active);
        $('.js-megaMenu > .menu-item > .sub-menu > .menu-item a').removeClass(class_subcat_active);
    }

    static hide_all_containers() {
        $('.js-megaMenu > .menu-item > .sub-menu > .menu-item > .sub-menu').hide();
    }
}