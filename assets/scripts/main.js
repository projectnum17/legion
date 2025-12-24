// global scripts

// === header scrolled

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
    const locationMenu = document.querySelector('.js-location-menu');
    if (!locationMenu) return;

    const cityMenu = locationMenu.querySelector('.mobile-menu__city');
    const currentCity = locationMenu.querySelector('span');

    if (!cityMenu || !currentCity) return;

    locationMenu.addEventListener('click', (e) => {
        if (!e.target.closest('span')) return;
        cityMenu.classList.toggle('is-show');
    });

    cityMenu.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;

        e.preventDefault();

        currentCity.textContent = link.textContent.trim();
        cityMenu.classList.remove('is-show');
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

headerHandler();
mobileMenuHandler();
subMenuHandler();
langHandler();
locationHandler();
