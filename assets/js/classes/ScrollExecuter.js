// importt './ScrollZoneWatcher.js';

// class ScrollExecuter {

//     constructor(options = {}) {

//         this.options = {
//             selector: undefined,
//             run_at_first: true,
//             on_zone: () => { },
//         };
//         this.options = Object.assign(this.options, options);

//         this.selector = $(this.options.selector);

//         this.zone = this.selector.parents('section');
//         if (!this.zone.length)
//             this.zone = this.selector.parent();

//         this.has_executed = false;
//         this.offset = 0;

//         this.init();
//         this.events();
//     }

//     init() {
//     }

//     events() {
//         const obj = this;

//         let watcher = new ScrollZoneWatcher({
//             start_point: obj.calc_start_point(),
//             end_point: obj.calc_end_point(),
//             on_before: () => {
//             },
//             on_zone: () => {
//                 if (!obj.has_executed) {
//                     obj.options.on_zone();
//                     obj.has_executed = true;
//                 }
//             },
//             on_after: () => {
//             },
//             on_resize: () => {
//                 watcher.set_start_point(obj.calc_start_point());
//                 watcher.set_end_point(obj.calc_end_point());
//             },
//         });

//         if (this.options.run_at_first && watcher.is_in_zone($(window).scrollTop())) {
//             obj.options.on_zone();
//             obj.has_executed = true;
//         }
//     }

//     calc_start_point() {
//         return this.zone.offset().top - $(window).height() - this.offset;
//     }

//     calc_end_point() {
//         return this.zone.offset().top + this.zone.outerHeight() + this.offset;
//     }

//     static create(options = {}) {
//         return new ScrollExecuter(options);
//     }
// }