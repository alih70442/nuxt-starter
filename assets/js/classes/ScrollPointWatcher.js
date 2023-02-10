class ScrollPointWatcher {

    constructor(options = {}) {

        this.options = {
            change_point: 100,
            call_on_scroll: () => { },
            call_before: () => { },
            call_after: () => { },
            call_on_reachment: () => { },
            call_on_resize: () => { },
        };
        this.options = Object.assign(this.options, options);

        this.change_point = +this.options.change_point;

        this.call_on_scroll = this.options.call_on_scroll;
        this.call_before = this.options.call_before;
        this.call_after = this.options.call_after;
        this.call_on_reachment = this.options.call_on_reachment;

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

        $(window).scroll(function () {
            let curr_scrollTop = $(this).scrollTop();
            
            obj.call_on_scroll(curr_scrollTop);

            obj.is_point_reached(curr_scrollTop) ? obj.call_after_point() : obj.call_before_point();

            if (curr_scrollTop == obj.change_point) {
                obj.call_on_reachment();
            }
        });

        $(window).resize(function () {
            obj.call_on_resize();
        });
    }

    is_point_reached(scrollTop) {
        return scrollTop >= this.change_point;
    }

    call_on_scroll() {
        if (this.call_on_scroll)
            this.call_on_scroll();
    }

    call_on_reachment() {
        if (this.call_on_reachment)
            this.call_on_reachment();
    }

    call_after_point() {
        if (this.call_after)
            this.call_after();
    }

    call_before_point() {
        if (this.call_before)
            this.call_before();
    }

    call_on_resize() {
        if (this.call_on_resize)
            this.call_on_resize();
    }

    set_point(new_point) {
        this.change_point = new_point;
    }

    static create(options = {}) {
        return new ScrollPointWatcher(options);
    }
}