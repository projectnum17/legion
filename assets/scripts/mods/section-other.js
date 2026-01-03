'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const sliderConfig = (selector, prev, next, pagination) => {
        if (typeof Swiper === 'undefined') return;

        const sliderEls = document.querySelector(selector);

        new Swiper(sliderEls, {
            slidesPerView: 3,
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
                    spaceBetween: 16,
                },
                480: {
                    slidesPerView: 2,
                },
                768: {
                    spaceBetween: 24,
                },
                1024: {
                    slidesPerView: 3,
                },
                1440: {
                    spaceBetween: 32,
                },
            },
        });
    };

    sliderConfig(
        '.js-other-slider',
        '.js-other-prev',
        '.js-other-next',
        '.js-other-pagination'
    );
});
