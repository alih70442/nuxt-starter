class Toast {

    constructor(type, text, time = 6000) {
        this.selector;
        this.type = type;
        this.text = text;

        this.time = +time;

        this.init();
        this.events();
    }

    events() {
        var obj = this;

        $(document).on('click', '.js-toast', function () {
            const $toast = $(this);
            $toast.fadeOut(function () {
                $toast.remove();
            });
        })
    }

    init() {
        const obj = this;

        var html = '';

        $('.js-toast__container').append(`
            <div class="c-toast ${this.type} flex items-center js-toast" style="display: none;">
                ${this.text}
                <div class="c-toast__progress"></div>
            </div>`
        );

        this.selector = $('.js-toast__container').children().last();

        this.selector.fadeIn(300);

        setTimeout(function () {

            $(obj.selector).fadeOut(function () {
                $(this).remove();
            })
        }, obj.time);
    }

    static create(type, text, time = 6000) {
        return new Toast(type, text, time);
    }
}