import './../../css/libs/tailwind.pcss'
import './../../scss/public/public.scss'

import {Modal, modal_handlers} from '../classes/tailwind/Modal'

Modal.instances();
modal_handlers();

// import fetch_products from "../api/products";
// import htmlize_products from "../htmlizer/products";
// import fetch_store from "../api/store";
// import htmlize_store from "../htmlizer/store";
//
// $(document).ready(async () => {
//
//     const BASE_PRODUCTS_COUNT = 9;
//
//     const current_url = window.location.href;
//     const store_identifier = current_url.split('/').pop();
//     // const store_identifier = 'ninitoon';
//     // const store_identifier = 'selda';
//
//     let products = null;
//     await fetch_products(0, BASE_PRODUCTS_COUNT, store_identifier).then((rs) => {
//         products = rs.data.products;
//         // console.log(products[0])
//
//         const products_html = htmlize_products(products)
//         $('.js-products').append(products_html);
//     });
//
//     let store = null;
//     await fetch_store(store_identifier).then((rs) => {
//         store = rs.data;
//         // console.log(store)
//
//         const store_html = htmlize_store(store);
//         $('.js-store').append(store_html);
//     });
//
//     let is_loading = false;
//     const all_products_count = store.product_count;
//     let fetch_iteration = 1;
//     $(window).on('scroll', function () {
//         const window = $(this);
//         const curr_scroll = window.scrollTop();
//         const document_height = $(document).height();
//         const screen_height = window.height();
//
//         if (all_products_count > fetch_iteration * BASE_PRODUCTS_COUNT && !is_loading)
//             if (curr_scroll + screen_height === document_height) {
//                 is_loading = true;
//
//                 fetch_products(fetch_iteration * BASE_PRODUCTS_COUNT, (fetch_iteration + 1) * BASE_PRODUCTS_COUNT, store_identifier).then(rs => {
//                     const products = rs.data.products;
//
//                     const products_html = htmlize_products(products)
//                     $('.js-products').append(products_html);
//                 }).finally(() => {
//                     const count = (all_products_count > (fetch_iteration + 1) * BASE_PRODUCTS_COUNT) ? (fetch_iteration + 1) * BASE_PRODUCTS_COUNT : all_products_count;
//                     $('.js-display__downloadedCount').text(count);
//                     fetch_iteration++;
//                     is_loading = false;
//                 })
//             }
//     });
//
//     $('.js-display__fullCount').text(all_products_count);
//
// })
