'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const sliderConfig = (selector, prev, next, pagination) => {
        if (typeof Swiper === 'undefined') return;

        const sliderEls = document.querySelector(selector);

        new Swiper(sliderEls, {
            slidesPerView: 1,
            spaceBetween: 20,
            speed: 700,
            navigation: {
                prevEl: prev,
                nextEl: next,
            },
            pagination: {
                el: pagination,
                type: 'fraction',
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },

                768: {
                    slidesPerView: 2,
                    spaceBetween: 24,
                },
            },
        });
    };

    sliderConfig(
        '.js-discount-slider',
        '.js-discount-prev',
        '.js-discount-next',
        '.js-discount-pagination'
    );

    sliderConfig(
        '.js-location-slider',
        '.js-location-prev',
        '.js-location-next',
        '.js-location-pagination'
    );
});
