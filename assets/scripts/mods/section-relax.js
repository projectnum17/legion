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
                    slidesPerView: 2,
                    spaceBetween: 16,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 24,
                },
            },
        });
    };

    sliderConfig(
        '.js-relax-slider',
        '.js-relax-prev',
        '.js-relax-next',
        '.js-relax-pagination'
    );
});
