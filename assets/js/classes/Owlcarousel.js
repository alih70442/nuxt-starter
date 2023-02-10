import './ScrollExecuter.js';

class Owlcarousel extends Base {

    constructor(options = {}) {
        super(options);

        this.options = {
            selector: undefined,
            options: undefined
        };
        this.options = Object.assign(this.options, options);

        this.init();
    }

    init() {
        const obj = this;

        obj.options.selector.owlCarousel(obj.options.options);
    }

    static create(options = {}) {

        // $(document).ajaxSuccess(function () {
        //     Owlcarousel.make_instances(options);
        // });

        return Owlcarousel.make_instances(options);
    }

    static make_instances(options) {

        const $element = $('body').find(options.selector);
        if (!Owlcarousel.is_selector($element)) {
            return new Owlcarousel({
                selector: $element,
                options: options.options
            });
        }
    }

}