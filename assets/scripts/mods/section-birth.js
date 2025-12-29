'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const sliderConfig = (
        selector,
        prev,
        next,
        pagination,
        breakpoints = {}
    ) => {
        if (typeof Swiper === 'undefined') return;

        const sliderEls = document.querySelector(selector);

        new Swiper(sliderEls, {
            slidesPerView: 1,
            spaceBetween: 40,
            speed: 900,
            navigation: {
                prevEl: prev,
                nextEl: next,
            },
            pagination: {
                el: pagination,
                type: 'fraction',
            },
            breakpoints,
        });
    };

    sliderConfig(
        '.js-birth-slider',
        '.js-birth-prev',
        '.js-birth-next',
        '.js-birth-pagination',
        {
            0: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 24,
            },
            1440: {
                slidesPerView: 3,
                spaceBetween: 32,
            },
        }
    );
});
