'use strict';

const class_cat = '.menu-item';
const class_cat_label = 'a',
    class_cat_con = '.sub-menu',
    class_subcat = '.menu-item';
const class_subcat_label = 'a',
    class_subcat_active = 'show',
    class_subcat_con = '.sub-menu',
    class_item = '.menu-item';

import './../../public/_functions.js';
import './Cat.js';
import './Subcat.js';

class MegaMenu {
    constructor(megaMenu) {
        this.megaMenu = $(megaMenu);
        this.cats = [];

        this.#init_subcats();
    }

    #init_subcats() {
        const obj = this;
        this.$cats = this.megaMenu.children(class_cat);

        this.$cats.each(function () {
            obj.cats.push(new Cat($(this)));
        });
    }

    static hide() {
        Header.hide_disabler();

        $('.js-megaMenu > .menu-item > .sub-menu').hide();
    }

    static create(megaMenu) {
        return new MegaMenu(megaMenu);
    }
}
MegaMenu.create('.js-megaMenu');