class Dropdown extends Base {

    static ANIMATION_DURATION = 200;

    constructor(options = {}) {
        super(options);

        this.options = {
            selector: undefined,
        };
        this.options = Object.assign(this.options, options);

        this.btn = this.selector.find('[data-button]');
        this.icon = this.selector.find('[data-icon]');
        this.menu = this.selector.find('[data-menu]');

        this.init();
        this.events();
    }

    init() {

        if (this.menu.hasClass('show')) {
            this.show_menu();
        }
    }

    events() {
        const obj = this;

        obj.btn.on('click', function (e) {
            e.stopPropagation();

            if (obj.is_menu_hidden()) {
                obj.show_menu();
            } else {
                obj.hide_menu();
            }
            Dropdown.hide_all_not_me(obj);
        });

        obj.menu.on('click', function (e) {
            e.stopPropagation();

            Dropdown.hide_all_not_me(obj);
        });

        $(document).on('click', function () {
            Dropdown.hide_all();
        });
    }

    show_menu() {
        this.btn.addClass('show bg-tertiary');
        this.menu.addClass('show');
        this.menu.stop().fadeIn(Dropdown.ANIMATION_DURATION)
        this.icon.removeClass('rotate-180');

        HeaderSearch.hide_box();
    }

    hide_menu() {
        this.btn.removeClass('show bg-tertiary');
        this.menu.removeClass('show');
        this.menu.stop().fadeOut(Dropdown.ANIMATION_DURATION)
        this.icon.addClass('rotate-180');
    }

    is_menu_hidden() {
        return !this.menu.hasClass('show');
    }

    static hide_all() {
        const $btns = $('[data-component="Dropdown"] [data-button]');
        const $icons = $('[data-component="Dropdown"] [data-icon]');
        const $menus = $('[data-component="Dropdown"] [data-menu]');
        $menus.fadeOut(Dropdown.ANIMATION_DURATION);
        $btns.removeClass('show bg-tertiary');
        $menus.removeClass('show');
        $icons.addClass('rotate-180');
    }

    static hide_all_not_me(object) {
        const $btns = $('[data-component="Dropdown"] [data-button]').not(object.btn);
        const $icons = $('[data-component="Dropdown"] [data-icon]').not(object.icon);
        const $menus = $('[data-component="Dropdown"] [data-menu]').not(object.menu);
        $menus.fadeOut(Dropdown.ANIMATION_DURATION);
        $btns.removeClass('show bg-tertiary');
        $menus.removeClass('show');
        $icons.addClass('rotate-180');
    }

    static create(options = {}) {
        return new Dropdown(options);
    }

    static instances() {

        make_instances();

        $(document).ajaxSuccess(function () {
            make_instances();
        });

        function make_instances() {

            const elements = $(document).find('[data-component="Dropdown"]');
            elements.each(function () {

                if (!Dropdown.is_selector($(this)))
                    Dropdown.create({
                        selector: $(this)
                    });
            });
        }
    }
}

Dropdown.instances();