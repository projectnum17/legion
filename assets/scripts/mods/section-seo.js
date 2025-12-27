'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('.js-seo-more');
    const content = document.querySelector('.js-seo-hidden');

    btn.addEventListener('click', () => {
        if (content.style.height) {
            content.style.height = null;
        } else {
            content.style.height = content.scrollHeight + 'px';
            content.classList.add('is-active')
        }

        btn.style.display = 'none'
    });
});
