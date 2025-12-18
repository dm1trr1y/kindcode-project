import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const aboutSwiper = new Swiper('.about-swiper', {
    modules: [Navigation, Pagination],
    grabCursor: true,
    simulateTouch: true,
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
        el: '.about-swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.about-btn-next',
        prevEl: '.about-btn-prev',
    },
    loop: false,
    watchOverflow: true,
    breakpoints: {
    0: {
      pagination: {
        dynamicBullets: true,
        dynamicMainBullets: 1,
      },
    },
    768: {
      pagination: {
        dynamicBullets: false,
      },
    },
    1440: {
      pagination: {
        dynamicBullets: false,
      },
    },
  },
});