class Modal extends Base {

    constructor(options = {}) {
        super(options);

        this.options = {
            selector: undefined,
            on_hidden_cb: () => { },
        };
        this.options = Object.assign(this.options, options);

        this.selector = this.options.selector;

        this.init();
        this.events();
    }

    init() { }

    events() { };

    show() {
        this.selector.fadeIn();
        $('body').css('overflow', 'hidden');
    }

    hide() {
        this.selector.fadeOut(400);
        $('body').css('overflow', 'auto');
        setTimeout(() => {
            this.options.on_hidden_cb();
        }, 400);
    }

    set_hidden_cb(cb) {
        if (cb)
            this.options.on_hidden_cb = cb;
    }

    static create(options = {}) {
        return new Modal(options);
    }

    static instances() {

        make_instances();

        $(document).ajaxSuccess(function () {
            make_instances();
        });

        function make_instances() {

            const elements = $(document).find('.js-modal');
            elements.each(function () {

                if (!Modal.is_selector($(this)))
                    Modal.create({
                        selector: $(this),
                        on_hidden_cb: () => { },
                    });
            });
        }
    }
}

Modal.instances();

function hide_modal($modal) {
    const modal_obj = Modal.get_object($modal);
    modal_obj.hide();
    $('body').css('overflow', 'auto');
}

function show_modal($modal) {
    const modal_obj = Modal.get_object($modal);
    modal_obj.show();
    $('body').css('overflow', 'hidden');
}

(function () {
    $('.js-modal__showBtn').on('click', function () {
        const btn = $(this),
            date_target = btn.attr('data-target'),
            $target = $('.js-modal[data-modal="' + date_target + '"]');
        const modal_obj = Modal.get_object($target);

        modal_obj.show();
    });

    $('.js-modal__disabler, .js-modal__hideBtn').on('click', function () {
        const $modal = $(this).parents('.js-modal');
        const modal_obj = Modal.get_object($modal);

        modal_obj.hide();
    });
})();