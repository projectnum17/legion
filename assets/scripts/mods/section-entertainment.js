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
                1440: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                },
            },
        });
    };

    sliderConfig(
        '.js-entertainment-slider',
        '.js-entertainment-prev',
        '.js-entertainment-next',
        '.js-entertainment-pagination'
    );
});
