// global scripts

const headerHandler = () => {
    const header = document.querySelector('.js-header');
    if (!header) return;

    let lastScroll = 0;

    const handleScroll = () => {
        const currentScroll = window.scrollY;

        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;

        if (currentScroll > 1) {
            header.classList.add('is-scroll');
        } else {
            header.classList.remove('is-scroll');
        }
    };

    window.addEventListener('scroll', handleScroll);

    handleScroll();
};

const mobileMenuHandler = () => {
    const menuBox = document.querySelector('.js-mob-menu');
    const menuTrigger = document.querySelector('.js-menu-trigger');
    const menuClose = document.querySelector('.js-mob-close');

    const openMenu = () => {
        menuBox.classList.add('is-show');
        document.body.classList.add('is-locked');
    };

    const closeMenu = () => {
        menuBox.classList.remove('is-show');
        document.body.classList.remove('is-locked');
    };

    if (menuBox && menuTrigger && menuClose) {
        menuTrigger.addEventListener('click', openMenu);
        menuClose.addEventListener('click', closeMenu);
    }
};

const subMenuHandler = () => {
    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('.js-submenu-trigger');
        if (!trigger) return;

        e.preventDefault();

        const parentLi = trigger.closest('li');
        const currentSubmenu = parentLi?.querySelector('.js-submenu');
        if (!currentSubmenu) return;

        const isOpen = currentSubmenu.classList.contains('is-show');

        document.querySelectorAll('.js-submenu.is-show').forEach((menu) => {
            menu.classList.remove('is-show');
        });

        document
            .querySelectorAll('.js-submenu-trigger.is-active')
            .forEach((btn) => {
                btn.classList.remove('is-active');
            });

        if (!isOpen) {
            currentSubmenu.classList.add('is-show');
            trigger.classList.add('is-active');
        }
    });
};

const locationHandler = () => {
    const locationMenus = document.querySelectorAll('.js-location-menu');

    locationMenus.forEach((locationMenu) => {
        const cityMenu = locationMenu.querySelector('div');
        const currentCity = locationMenu.querySelector('span');

        if (!cityMenu || !currentCity) return;

        const isMobile = () => window.innerWidth < 768;

        locationMenu.addEventListener('mouseenter', () => {
            if (!isMobile()) cityMenu.classList.add('is-show');
        });

        locationMenu.addEventListener('mouseleave', () => {
            if (!isMobile()) cityMenu.classList.remove('is-show');
        });

        locationMenu.addEventListener('click', (e) => {
            e.stopPropagation();

            const link = e.target.closest('a');
            if (link) {
                e.preventDefault();
                currentCity.textContent = link.textContent.trim();
                cityMenu.classList.remove('is-show');
                return;
            }

            if (isMobile()) {
                if (!cityMenu.contains(e.target)) {
                    cityMenu.classList.toggle('is-show');
                }
            }
        });
    });

    document.addEventListener('click', () => {
        locationMenus.forEach((menu) => {
            const cityMenu = menu.querySelector('div');
            if (cityMenu.classList.contains('is-show')) {
                cityMenu.classList.remove('is-show');
            }
        });
    });
};

const langHandler = () => {
    const langMenu = document.querySelector('.js-lang-menu');
    if (!langMenu) return;

    const current = langMenu.querySelector('.lang-switcher__label');
    const list = langMenu.querySelector('.lang-switcher__list');
    if (!current || !list) return;

    current.addEventListener('click', () => {
        list.classList.toggle('is-show');
    });
};

const moveLang = () => {
    const langMenu = document.querySelector('.js-lang-menu');
    const langPortal = document.querySelector('.js-lang-portal');

    const container = document.querySelector('.container');
    const nav = container.querySelector('.mobile-menu__nav');
    const contacts = container.querySelector('.mobile-menu__contacts');

    function handleLangMenu() {
        if (window.innerWidth >= 480) {
            if (langMenu.parentNode !== langPortal) {
                langPortal.appendChild(langMenu);
            }
        } else {
            if (langMenu.parentNode !== container) {
                container.insertBefore(langMenu, contacts);
            }
        }
    }

    handleLangMenu();
    window.addEventListener('resize', handleLangMenu);
};

const modalFormHandler = () => {
    const modalTrigger = document.querySelectorAll('.js-modal-trigger'),
        modalBox = document.querySelector('.js-form-modal');

    if (!modalTrigger || !modalBox) return;

    const successWindow = modalBox.querySelector('.js-form-success'),
        formWindow = modalBox.querySelector('.js-form-box'),
        formData = modalBox.querySelector('form');

    successWindow.classList.add('is-hide');

    if (!successWindow || !formWindow || !formData) return;

    const closeSuccess = successWindow.querySelector('.js-success-close'),
        closeForm = modalBox.querySelector('.js-form-close');

    if (!closeSuccess || !closeForm) return;

    const closeModal = () => {
        modalBox.classList.remove('is-show');
        const form = modalBox.querySelector('form');
        form.reset();
        formWindow.classList.remove('is-hide');
        document.body.classList.remove('is-locked');
    };

    const openModal = () => {
        modalBox.classList.add('is-show');
        successWindow.classList.add('is-hide');
        formWindow.classList.remove('is-hide');
        document.body.classList.add('is-locked');
    };

    modalTrigger.forEach((btn) => btn.addEventListener('click', openModal));

    closeForm.addEventListener('click', closeModal);
    closeSuccess.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalBox.classList.contains('is-show')) {
            closeModal();
        }
    });

    modalBox.addEventListener('click', (e) => {
        const inner = modalBox.querySelector('.js-form-inner');
        if (e.target === modalBox || e.target === inner) {
            closeModal();
        }
    });

    formData.addEventListener('submit', (e) => {
        e.preventDefault();
        successWindow.classList.remove('is-hide');
        formWindow.classList.add('is-hide');
    });
};
document.addEventListener('DOMContentLoaded', () => {
    headerHandler();
    langHandler();
    mobileMenuHandler();
    subMenuHandler();
    locationHandler();
    modalFormHandler();

    moveLang();
});
