class Sliding extends Base {

    static global_elements = [];

    constructor(options = {}) {
        super(options);

        this.options = {
            selector: undefined,
            button_html: undefined
        };
        this.options = Object.assign(this.options, options);

        this.selector = $(options.selector);
        Sliding.global_elements.push($(this.selector).get(0));
        this.btn;
        this.slider;

        this.animation_duration = this.selector.attr('data-animationDuration') | 400;

        this.closeTextbtn = this.selector.attr('data-openTextBtn') || 'متن کامل';
        this.openTextbtn = this.selector.attr('data-closeTextBtn') || 'بستن';

        this.btn_classes = this.selector.attr('data-btnClasses') || '';

        this.closeHeight = parseInt(this.selector.attr('data-closeHeight') || '200px');
        this.openHeight;

        this.is_open = (this.selector.attr('data-isOpen') === 'true') ? true : false || false;
        this.has_inited = (this.selector.attr('data-hasInited') === 'true') ? true : false || false;

        if (this.can_init()) {
            this.init_html();
            this.events();
        }
    }

    events() {
        var obj = this;

        this.btn.click(function () {
            if (obj.is_open) {
                obj.close();
                obj.is_open = false;
            }
            else {
                obj.open();
                obj.is_open = true;
            }
        })
    }

    close() {
        var obj = this;

        this.slider.animate({
            'height': this.closeHeight
        }, obj.animation_duration, function () {
            obj.btn.text(obj.closeTextbtn);
            obj.btn.removeClass('c-sliding__btn-active');
        });

        this.btn.removeClass('c-sliding__btn--active');
        obj.scrollTo(obj.selector);
    }

    open() {
        var obj = this;

        this.slider.animate({
            'height': this.openHeight
        }, obj.animation_duration   , function () {
            $(this).css('height', 'auto');
            obj.btn.text(obj.openTextbtn);
            obj.btn.addClass('c-sliding__btn-active');
        });
        this.btn.addClass('c-sliding__btn--active');

        setTimeout(() => {
            this.openHeight = this.calc_height();
        }, obj.animation_duration   );
    }

    scrollTo(target) {
        $('html, body').stop().animate({
            scrollTop: $(target).offset().top - 80
        }, this.animation_duration)
    }

    init_html() {

        if (!this.has_inited) {

            this.selector.wrapInner('<div class="c-sliding__slider js-sliding__slider"></div>');

            // append default btn
            if (this.button_html == undefined) {
                this.selector.append(`
                <button class="c-sliding__btn js-sliding__btn p-link" type="button">
                    `+ (this.is_open ? this.openTextbtn : this.closeTextbtn) + `
                </button>
            `);
            }
            // append input btn
            else {
                this.selector.append(this.button_html);
                this.selector.find('button').addClass('c-sliding__btn').addClass('js-sliding__btn');
            }
        }

        this.slider = this.selector.find('.js-sliding__slider');
        this.btn = this.selector.find('.js-sliding__btn');

        this.btn.attr('class', this.btn.attr('class') + ' ' + this.btn_classes);

        // save init height
        this.slider.css('height', 'auto');
        this.openHeight = this.calc_height();
        // set new height
        if (!this.is_open) {
            this.slider.css('height', this.closeHeight);
        } else {
            this.btn.addClass('c-sliding__btn-active');
        }
    }

    can_init() {
        let slider_height = this.selector.outerHeight();
        if (slider_height == 0)
            slider_height = this.calc_height();
        return parseInt(this.closeHeight) < slider_height;
    }

    calc_height() {
        return this.selector.actual('outerHeight');
    }

    static instances() {

        make_instances();

        $(document).ajaxSuccess(function () {
            make_instances();
        });

        function make_instances() {

            const searchable_dropdowns = $(document).find('[data-component="Sliding"]');
            searchable_dropdowns.each(function () {

                if (!Sliding.is_object($(this)))
                    new Sliding({
                        selector: $(this).get(0)
                    });
            });
        }
    }
}
Sliding.instances();