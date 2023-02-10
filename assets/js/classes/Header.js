'use strict';

import './../public/_functions.js';
// importt './../classes/tailwind/Dropdown.js';
import './../classes/Timeout.js';
import './../classes/ScrollPointWatcher.js';
import './../classes/ScrollDirectionWatcher.js';

class Header {
    static header = $('.js-header');
    static disabler = Header.header.find('.js-header__disabler');
    static btn = Header.header.find('.js-header__btn');
    static sidebar = Header.header.find('.js-header__sidebar');

    constructor() {

        this.events();
    }

    events() {

        Header.btn.on('click', function () {
            Header.show_sidebar();
        });

        Header.disabler.on('click', function () {
            Header.hide_sidebar();
        });

        $('.js-sidebar__close').on('click', function () {
            Header.hide_sidebar();
        });
    }

    static show_sidebar() {
        if (is_mobile_size()) {
            Header.sidebar.css({
                'transform': 'translateX(0)'
            });
            Header.show_disabler();
            $('body').css('overflow', 'hidden');
        }
    }

    static hide_sidebar() {
        if (is_mobile_size()) {
            Header.sidebar.css({
                'transform': 'translateX(100%)'
            });
        }
        $('body').css('overflow', 'auto');
        Header.hide_disabler();
    }

    static show_disabler() {
        Header.disabler.stop().fadeIn(200);
    }
    static hide_disabler() {
        Header.disabler.stop().fadeOut(200);
    }

    static init() {
        new Header();
    }
}
Header.init();


class HeaderFixness {

    static selector = $(document).find('.js-header');
    static is_fixed = false;
    static header_top = 0;
    static scroll_offset = 300;

    constructor(options = {}) {
        HeaderFixness.init();
        HeaderFixness.events();
    }

    static init() {

        // HeaderFixness.selector.before('<div style="height: ' + HeaderFixness.selector.outerHeight() + 'px"></div>');
    }

    static events() {

        if (!HeaderFixness.is_static())
            $(document).on('scroll', function () {

                if ($(document).scrollTop() > HeaderFixness.scroll_offset && !HeaderFixness.is_fixed) {
                    HeaderFixness.fix();
                } else if ($(document).scrollTop() <= HeaderFixness.header_top && HeaderFixness.is_fixed) {
                    HeaderFixness.unfix();
                }
            })
    }

    static fix() {
        HeaderFixness.selector.addClass('p-header--fixed');

        HeaderFixness.selector.css({
            'position': 'fixed',
            'top': '-150px'
        });

        HeaderFixness.selector.stop().animate({
            'top': '0'
        }, 300)
        HeaderFixness.is_fixed = true;
    }

    static unfix() {
        HeaderFixness.selector.removeClass('p-header--fixed');

        HeaderFixness.selector.css({
            'position': 'absolute',
        })

        HeaderFixness.selector.stop().animate({
            'top': HeaderFixness.header_top + 'px',
        }, 0)
        HeaderFixness.is_fixed = false;
    }

    static has_banner() {
        return HeaderFixness.selector.hasClass('js-navbar--banner');
    }

    static is_static() {
        return HeaderFixness.selector.hasClass('js-navbar--static');
    }
}
new HeaderFixness();


// class HeaderSubmenu {

//     static selector = $(document).find('.js-submenu');
//     static is_shown = true;
//     static scroll_offset = 500;
//     static timeout = null;

//     constructor(options = {}) {

//         HeaderSubmenu.timeout = new Timeout({
//             time: 200,
//             callback: () => { }
//         });
//         HeaderSubmenu.init();
//         HeaderSubmenu.events();
//     }

//     static init() {
//     }

//     static events() {

//         if (!is_mobile_size()) {

//             var lastScrollTop = 0;
//             window.addEventListener('scroll', function () {
//                 var st = window.pageYOffset || document.documentElement.scrollTop;
//                 const curr_scrollTop = $(this).scrollTop();

//                 if (curr_scrollTop > HeaderSubmenu.scroll_offset) {

//                     if (st > lastScrollTop) {
//                         if (HeaderSubmenu.is_shown)
//                             HeaderSubmenu.hide();
//                     } else {
//                         if (!HeaderSubmenu.is_shown)
//                             HeaderSubmenu.show();
//                     }

//                     lastScrollTop = st <= 0 ? 0 : st;
//                 }
//             }, false);
//         }
//     }

//     static show() {
//         HeaderSubmenu.selector.stop().slideDown(200);

//         HeaderSubmenu.timeout.set_callback(() => {
//             HeaderSubmenu.is_shown = true;
//         });
//         HeaderSubmenu.timeout.call();
//     }

//     static hide() {
//         HeaderSubmenu.selector.stop().slideUp(200);

//         HeaderSubmenu.timeout.set_callback(() => {
//             HeaderSubmenu.is_shown = false;
//         });
//         HeaderSubmenu.timeout.call();

//         // MegaMenu.hide();
//     }
// }
// new HeaderSubmenu();


// class HeaderSearch {
//     static con = $('.js-headerSearch');
//     static input = HeaderSearch.con.find('.js-headerSearch__input');
//     static result = HeaderSearch.con.find('.js-headerSearch__result');

//     constructor() {
//         this.events();
//     }

//     events() {

//         if (!is_mobile_size()) {

//             HeaderSearch.con.on('click touchstart', function (e) {
//                 e.stopPropagation();
//             });

//             HeaderSearch.input.on('click touchstart', function (e) {
//                 e.stopPropagation();

//                 HeaderSearch.show_box();
//                 Header.show_disabler();
//             });

//             HeaderSearch.result.on('click touchstart', function (e) {
//                 e.stopPropagation();

//                 HeaderSearch.show_box();
//                 Header.show_disabler();
//             });

//             $(document).on('click', function () {
//                 HeaderSearch.hide_box();
//                 Header.hide_disabler();
//             });
//         }
//     }

//     static show_box() {
//         HeaderSearch.con.addClass('shadow-md');
//         HeaderSearch.input.removeClass('bg-gray-100');
//         HeaderSearch.input.addClass('bg-white');

//         HeaderSearch.result.css('height', HeaderSearch.calc_result_height() + 'px')

//         HeaderSearch.result.show();
//         Dropdown.hide_all();
//     }

//     static hide_box() {
//         HeaderSearch.con.removeClass('shadow-md');
//         HeaderSearch.input.addClass('bg-gray-100');
//         HeaderSearch.input.removeClass('bg-white');

//         HeaderSearch.result.hide();
//     }

//     static calc_result_height() {
//         return $(window).height() - 2 * HeaderSearch.input.outerHeight();
//     }

//     static init() {
//         new HeaderSearch();
//     }
// }
// HeaderSearch.init();

// $('.js-headerSearch-inputStatic').on('focus', function () {
//     $('.js-headerSearch').fadeIn(200, function () {
//         HeaderSearch.input.focus();
//     });
//     HeaderSearch.show_box();
//     $('body').css('overflow', 'hidden');
// });

// $('.js-headerSearch-close').on('click', function () {
//     $('.js-headerSearch').fadeOut(150);
//     HeaderSearch.hide_box();
//     $('body').css('overflow', 'auto');
// });


// Header.show_disabler();
// HeaderSearch.show_box();