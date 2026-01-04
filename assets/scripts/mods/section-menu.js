'use strict';
document.addEventListener('DOMContentLoaded', () => {
    const buttonHandler = () => {
        const filterBtn = document.querySelectorAll('.js-menu-filter');

        if (!filterBtn.length) return;

        filterBtn[0].classList.add('is-active');

        filterBtn.forEach((btn) => {
            btn.addEventListener('click', () => {
                filterBtn.forEach((el) => {
                    el.classList.remove('is-active');
                });
                btn.classList.add('is-active');
            });
        });
    };

    const bagHandler = () => {
        const bagItems = document.querySelector('.js-menu-bag');
        const bagBox = document.querySelector('.js-bag-modal');

        if (!bagItems || !bagBox) return;

        const closeBagBtn = bagBox.querySelector('.js-bag-close');
        const bagList = bagBox.querySelector('.js-bag-box');

        const openBagHandler = () => {
            document.body.classList.add('is-locked');
            bagBox.classList.add('is-show');
        };
        const closeBagHandler = () => {
            document.body.classList.remove('is-locked');
            bagBox.classList.remove('is-show');
        };

        bagItems.addEventListener('click', openBagHandler);
        closeBagBtn.addEventListener('click', closeBagHandler);

        document.addEventListener('click', (e) => {
            if (!bagBox.classList.contains('is-show')) return;

            if (!bagList.contains(e.target) && !bagItems.contains(e.target)) {
                closeBagHandler();
            }
        });
    };

    buttonHandler();
    bagHandler();
});
