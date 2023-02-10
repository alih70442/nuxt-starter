class Alert {

    constructor(type, title, text, time = 10000) {
        this.selector;
        this.type = type;
        this.title = title;
        this.text = text;

        this.time = +time;

        this.create();
        this.events();
    }

    events() {
        var obj = this;

        $(document).on('click', '.js-alerts__alert-close', function () {
            $(this).parents('.js-alerts__alert').fadeOut(function () {
                $(this).remove();
            });
        })
    }

    create() {
        const obj = this;

        var html = '';
        var icon = '';
        var text_color = '';
        var color = '';

        switch (this.type) {
            case 'success':
                icon = 'icon-check';
                text_color = 'success';
                color = '#4aae20';
                break;
            case 'danger':
                icon = 'icon-warning'
                text_color = 'danger';
                color = '#d40000';
                break;
            case 'normal':
                icon = 'icon-star-2'
                text_color = 'secondary';
                color = '#0b8ae1';
                break;
        }

        html = `<div class="t-alerts__alert d-flex align-items-center mt-lg-3 js-alerts__alert" style="background: ${color}; display: none;">
            
                <button type="button" class="my-link t-alerts__alert-close js-alerts__alert-close">
                    <i class="t-light-passive t-14 icon icon-times-2"></i>
                </button>
                <div class="t-alerts__alert-image my-bg-${text_color} pos-centering">
                    <i class="t-white icon-xl icon ${icon}"></i>
                </div>
                <div class="t-alerts__alert-message d-flex flex-column p-3 pl-5">
                    <span class="title t-14 t-${text_color} font-weight-bold">${this.title}</span>
                    <span class="text t-13">${this.text}</span>
                </div>
                <div class="t-alerts__alert-progress my-bg-${text_color}"></div>
            </div>`

        $('.js-alerts').append(html);

        this.selector = $('.js-alerts').children().last();

        obj.selector.find('.t-alerts__alert-progress').css('animation-duration', obj.time / 1000 + 's');

        this.selector.fadeIn(300);

        setTimeout(function () {

            $(obj.selector).fadeOut(function () {
                $(this).remove();
            })
        }, obj.time);
    }
}