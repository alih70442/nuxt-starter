class ScrollZoneWatcher {

    constructor(options = {}) {

        this.options = {
            on_start: () => { },
        };
        this.options = Object.assign(this.options, options);

        this.start_point = +this.options.start_point;
        this.end_point = +this.options.end_point;

        this.on_before = this.options.on_before;
        this.on_zone = this.options.on_zone;
        this.on_after = this.options.on_after;

        this.on_resize = this.options.on_resize;

        this.init();
        this.events();
    }

    init() {

    }

    events() {
        const obj = this;

        $(window).scroll(function () {
            exec();
        });

        $(window).resize(function () {
            obj.options.on_resize();

            exec();
        });

        function exec() {

            let curr_scrollTop = $(window).scrollTop();

            if (obj.where_pos(curr_scrollTop) === -1)
                obj.options.on_before();
            else if (obj.where_pos(curr_scrollTop) === 0)
                obj.options.on_zone();
            else if (obj.where_pos(curr_scrollTop) === 1)
                obj.options.on_after();
        }
    }

    where_pos(scrollTop) {

        if (scrollTop < this.start_point) return -1;
        if (scrollTop > this.end_point) return 1;
        return 0;
    }

    is_in_zone(scrollTop) {
        return this.where_pos(scrollTop) === 0;
    }

    set_start_point(new_point) {
        this.start_point = new_point;
    }

    set_end_point(new_point) {
        this.end_point = new_point;
    }

    static create(options = {}) {
        return new ScrollZoneWatcher(options);
    }
}