'use strict';

document.addEventListener('DOMContentLoaded', () => {
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

    videoModal();
});
