'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const reviewBox = () => {
        const reviewItems = document.querySelectorAll('.js-review-box');
        const popup = document.querySelector('.js-review-modal');
        if (!reviewItems.length || !popup) return;

        const popupClose = popup.querySelector('.js-review-close');
        const popupUser = popup.querySelector('.js-review-user');
        const popupName = popup.querySelector('.js-review-name');
        const popupRating = popup.querySelector('.js-review-value');
        const popupContent = popup.querySelector('.js-review-content');

        if (!popupClose || !popupContent || !popupUser) return;

        const openPopup = () => {
            popup.classList.add('is-show');
            document.body.classList.add('is-locked');
        };

        const closePopup = () => {
            popup.classList.remove('is-show');
            document.body.classList.remove('is-locked');
        };

        reviewItems.forEach((box) => {
            const textEl = box.querySelector('.js-review-text');
            const btn = box.querySelector('.js-review-trigger');

            if (!textEl || !btn) return;

            const fullText = textEl.textContent.trim();

            if (fullText.length > 100) {
                textEl.textContent = fullText.slice(0, 100) + '...';
                btn.style.display = '';
            } else {
                btn.style.display = 'none';
            }

            btn.addEventListener('click', () => {
                const name = box.querySelector('.js-box-name')?.textContent;
                const img = box.querySelector('.js-box-user img');
                const rating = box.querySelector('.js-box-rating');

                popupName.textContent = name || '';
                popupContent.textContent = fullText;

                popupUser.innerHTML = '';
                if (img) {
                    popupUser.appendChild(img.cloneNode(true));
                }

                popupRating.innerHTML = rating ? rating.innerHTML : '';

                openPopup();
            });
        });

        popupClose.addEventListener('click', closePopup);

        popup.addEventListener('click', (e) => {
            if (!e.target.closest('.js-e-target')) {
                closePopup();
            }
        });
    };

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

    const videoModal = () => {
        const videoBoxes = document.querySelectorAll('.js-video-item');
        const modal = document.querySelector('.js-video-modal');
        if (!modal || !videoBoxes.length) return;

        const closeBtn = modal.querySelector('.js-video-modal__close');
        const playBtn = modal.querySelector('.js-video-modal__play');
        const videoPlayer = modal.querySelector('#videoPlayer');
        const wrapper = modal.querySelector('.js-video-modal__wrapper');

        if (!closeBtn || !playBtn || !videoPlayer || !wrapper) return;

        videoBoxes.forEach((box) => {
            box.addEventListener('click', () => {
                const videoSrc = box.getAttribute('data-video');
                const posterImg = box.querySelector('img');
                const posterSrc = posterImg
                    ? posterImg.getAttribute('src')
                    : '';

                if (!videoSrc) return;

                videoPlayer.src = videoSrc;

                if (posterSrc) {
                    videoPlayer.poster = posterSrc;
                } else {
                    videoPlayer.removeAttribute('poster');
                }

                modal.classList.add('is-show');
                document.body.classList.add('is-locked');

                videoPlayer.pause();
                videoPlayer.currentTime = 0;
                videoPlayer.removeAttribute('controls');

                playBtn.classList.remove('is-hide');
                wrapper.classList.remove('play');
            });
        });

        const handleVideoPlay = () => {
            playBtn.classList.add('is-hide');
            wrapper.classList.add('play');
            videoPlayer.setAttribute('controls', '');
        };

        const handleVideoPauseOrEnd = () => {
            playBtn.classList.remove('is-hide');
            wrapper.classList.remove('play');
            videoPlayer.removeAttribute('controls');
        };

        videoPlayer.addEventListener('play', handleVideoPlay);
        videoPlayer.addEventListener('pause', handleVideoPauseOrEnd);
        videoPlayer.addEventListener('ended', handleVideoPauseOrEnd);

        playBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            videoPlayer.paused ? videoPlayer.play() : videoPlayer.pause();
        });

        const closeModal = () => {
            modal.classList.remove('is-show');
            document.body.classList.remove('is-locked');
            wrapper.classList.remove('play');

            setTimeout(() => {
                videoPlayer.pause();
                videoPlayer.src = '';
                videoPlayer.load();
            }, 300);
        };

        closeBtn.addEventListener('click', closeModal);

        modal.addEventListener('click', (e) => {
            if (!wrapper.contains(e.target)) closeModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('is-show')) {
                closeModal();
            }
        });
    };

    sliderConfig(
        '.js-reviews-slider',
        '.js-reviews-prev',
        '.js-reviews-next',
        '.js-reviews-pagination',
        {
            0: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 24,
            },
            1024: {
                slidesPerView: 2.5,
                spaceBetween: 24,
            },
            1920: {
                slidesPerView: 4,
            },
        }
    );

    sliderConfig(
        '.js-videos-slider',
        '.js-videos-prev',
        '.js-videos-next',
        '.js-videos-pagination',
        {
            0: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 24,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 24,
            },
        }
    );

    sliderConfig(
        '.js-gallery-slider-mob',
        '.js-gallery-prev-mob',
        '.js-gallery-next-mob',
        '.js-gallery-pagination-mob',
        {
            0: {
                slidesPerView: 1,
                grid: {
                    rows: 1,
                },
                spaceBetween: 20,
            },
            480: {
                slidesPerView: 1,
                grid: {
                    rows: 2,
                    fill: 'row',
                },
                spaceBetween: 20,
            },
        }
    );

    sliderConfig(
        '.js-gallery-slider',
        '.js-gallery-prev',
        '.js-gallery-next',
        '.js-gallery-pagination',
        {
            0: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
        }
    );

    const fancyInit = (selector) => {
        Fancybox.bind(`[data-fancybox=${selector}]`, {
            Thumbs: false,
            Toolbar: true,
        });
    };

    fancyInit('gallery-mob');
    fancyInit('gallery');
    reviewBox();
    videoModal();
});
