import '../public/_functions.js';

class RangeSlider {

    constructor(opt = {}) {
        this.opt = {
            selector: undefined,
            min: 0,
            max: 1000000
        };
        this.opt = Object.assign(this.opt, opt);

        this.opt.min = (opt.min !== undefined) ? opt.min : 0;
        this.opt.max = (opt.max !== undefined) ? opt.max : 1000000;

        // parent of rangeSlider
        this.parent = $(opt.selector);
        // max & min allowed amounts
        this.min = this.opt.min;
        this.max = this.opt.max;
        // main input
        this.input = $(this.parent).find('.js-rangeSlider__input');
        // hidden inputs
        this.input_min = $(this.parent).find('.js-rangeSlider__inputMin');
        this.input_max = $(this.parent).find('.js-rangeSlider__inputMax');
        // show zones
        this.show_min = $(this.parent).find('.js-rangeSlider__showMin');
        this.show_max = $(this.parent).find('.js-rangeSlider__showMax');

        this.events();
    }

    events() {
        let obj = this;

        $(obj.input).ionRangeSlider({
            type: "double",
            min: obj.min,
            max: obj.max,
            from: obj.input_min.val() != '' ? obj.input_min.val() : obj.min,
            to: obj.input_max.val() != '' ? obj.input_max.val() : obj.max,
            hide_min_max: true,
            hide_from_to: true,
            extra_classes: 'c-rangeSlider',
            // prettify_separator: '،',

            onStart: function (data) {

                // if ($(obj.input_min).val() != '') {
                // $(obj.input_min).val(data.from);
                // }
                $(obj.show_min).text(data.from.courency() + ' تومان');

                // if ($(obj.input_max).val() != '') {
                //     $(obj.input_max).val(data.to);
                // }
                $(obj.show_max).text(data.to.courency() + ' تومان');
            },

            onChange: function (data) {

                $(obj.input_min).val(data.from);
                $(obj.show_min).text(data.from.courency() + ' تومان');
                $(obj.input_max).val(data.to);
                $(obj.show_max).text(data.to.courency() + ' تومان');

                // trigger inputs change event
                // $(obj.input_min).change();
                // $(obj.input_max).change();
            },
        });
    }
}