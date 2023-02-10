class ScrollDirectionWatcher {

    constructor(options = {}) {

        this.options = {
            call_on_top: () => { },
            call_on_bottom: () => { },
            call_on_resize: () => { },
        };
        this.options = Object.assign(this.options, options);

        this.call_on_top = this.options.call_on_top;
        this.call_on_bottom = this.options.call_on_bottom;

        this.call_on_resize = this.options.call_on_resize;

        this.init();
        this.events();
    }

    init() {

    }

    events() {
        this.on_scroll();
    }

    on_scroll() {
        const obj = this;

        var lastScrollTop = 0;
        window.addEventListener('scroll', function () {
            var st = window.pageYOffset || document.documentElement.scrollTop;

            if (st > lastScrollTop) {
                obj.call_on_bottom()
            } else {
                obj.call_on_top()
            }

            lastScrollTop = st <= 0 ? 0 : st;
        }, false);

        $(window).on('resize', function () {
            obj.call_on_resize();
        });
    }

    call_on_top() {
        if (this.call_on_top)
            this.call_on_top();
    }

    call_on_bottom() {
        if (this.call_on_bottom)
            this.call_on_bottom();
    }

    call_on_resize() {
        if (this.call_on_resize)
            this.call_on_resize();
    }

    set_point(new_point) {
        this.change_point = new_point;
    }

    static create(options = {}) {
        return new ScrollDirectionWatcher(options);
    }
}