const swiper = new Swiper('.first.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    //   slidesPerView: 1,
    autoplay: {
        delay: 5000,
    },

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.first.swiper .swiper-button-next',
        prevEl: '.first.swiper .swiper-button-prev',
    },

});

const swiper2 = new Swiper('.second.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 10,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination2',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.second.swiper .swiper-button-next',
        prevEl: '.second.swiper .swiper-button-prev',
    },

    breakpoints: {
        // when window width is >= 320px
        320: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 20
        },
        // when window width is >= 480px
        480: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 30
        },
        // when window width is >= 640px
        640: {
            slidesPerView: 4,
            slidesPerGroup: 4,
            spaceBetween: 40
        }
    }

});
