'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const sliderConfig = (selector, prev, next, pagination) => {
        if (typeof Swiper === 'undefined') return;

        const sliderEls = document.querySelector(selector);
        const parentBlock = document.querySelector('.js-blog-parent');

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
            on: {
                slideChangeTransitionEnd() {
                    parentBlock.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
                },
            },
        });
    };

    sliderConfig(
        '.js-blog-slider',
        '.js-blog-prev',
        '.js-blog-next',
        '.js-blog-pagination'
    );
});
