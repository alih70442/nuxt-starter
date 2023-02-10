class Cat {
    constructor(cat) {
        this.cat = $(cat);
        this.label = this.cat.children(class_cat_label);
        this.container = this.cat.children(class_cat_con);
        this.subcats = [];

        this.is_container_open = false;

        this.#init_subcats();
        this.#events();
    }

    #init_subcats() {
        const obj = this;
        const $subcats = this.cat.children(class_cat_con).children(class_subcat);

        $subcats.each(function () {
            obj.subcats.push(new Subcat($(this)));
        });
    }

    #events() {
        const obj = this;

        if (is_mobile_size()) {

            obj.label.on('click', function (e) {

                if (is_touch()) {
                    e.preventDefault();
                }

                for (const subcat of obj.subcats) {
                    subcat.hide_container();
                }

                obj.toggle_container()

                // obj.subcats[0].activate();
                // obj.subcats[0].show_container();
            });

        } else {

            obj.label.on('click', function (e) {

                if (is_touch()) {
                    e.preventDefault();
                }
            });

            obj.cat.on('mouseenter touchstart', function (e) {
                e.stopPropagation()

                obj.show_container();

                for (const subcat of obj.subcats) {
                    // subcat.deactivate();
                    subcat.hide_container();
                }

                Header.show_disabler();
                obj.subcats[0].activate();
                obj.subcats[0].show_container();
            });

            obj.cat.on('click', function (e) {
                e.stopPropagation();
            });

            obj.cat.on('mouseleave', function () {
                obj.hide_container();
                Header.hide_disabler();
            });

            $('body').on('touchstart', function () {
                obj.hide_container();
                Header.hide_disabler();
            });
        }
    }

    show() {
        this.cat.show();
    }

    hide() {
        this.cat.hide();
    }

    show_container() {
        if (is_mobile_size())
            this.container.slideDown();
        else {
            this.container.show();
            this.container.css({
                'height': this.calc_container_height() + 'px',
                'top': this.calc_container_top() + 'px',
            });
        }
        this.cat.addClass('show');
        this.label.addClass('show');
        this.is_container_open = true;

        HeaderSearch.hide_box();
        Dropdown.hide_all();
    }

    hide_container() {
        if (is_mobile_size())
            this.container.slideUp();
        else
            this.container.hide();
        this.cat.removeClass('show');
        this.label.removeClass('show');
        this.is_container_open = false;
    }

    toggle_container() {
        if (this.is_container_open)
            this.hide_container();
        else
            this.show_container();
    }

    calc_container_top() {
        const extra_offset = 0;
        const link_height = this.cat.outerHeight();
        return link_height + extra_offset;
    }

    calc_container_height() {
        const extra_offset = 20;
        const header_height = Header.header.outerHeight();
        return $(window).height() - header_height - extra_offset;
    }

    get_active_subcat_index() {
        for (let i = 0; this.subcats.length > i; i++) {
            if (this.subcats[i].gg())
                return i;
        }
    }
}