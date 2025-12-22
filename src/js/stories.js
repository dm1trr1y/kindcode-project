import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import Raty from 'raty-js';
import Swal from 'sweetalert2';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import starOn from '../img/star-filled-min.jpg';
import starOff from '../img/star-outline-min.jpg';
import starHalf from '../img/star-half-min.jpg';

const API_URL = 'https://paw-hut.b.goit.study/api/feedbacks';

const toast = document.querySelector('#toast-container');

document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.getElementById('feedbacks-wrapper');
  const loader = document.getElementById('loader');
  const toastContainer = document.getElementById('toast-container');

  if (!wrapper || !loader || !toastContainer) return;

  // Створення карток
  const renderFeedbacks = feedbacks => {
    wrapper.innerHTML = '';
    feedbacks.forEach(({ rate, description, author }) => {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      slide.innerHTML = `
        <article class="feedback-card">
          <div class="feedback-card__rating">
          <div class="star-rating star-rating--medium" data-score="${rate}"></div>
        </div>
          <p class="feedback-card__text">${description}</p>
          <span class="feedback-card__author">${author}</span>
        </article>`;
      wrapper.appendChild(slide);
      // renderRating(slide.querySelector('.feedback-card__rating'), rate);
    });
    document.querySelectorAll('.star-rating').forEach(box => {
      const ratyBox = new Raty(box, {
        readOnly: true,
        starHalf: starHalf,
        starOn: starOn,
        starOff: starOff,
        numberMax: 5,
      });
      ratyBox.init();
    });
  };

  // Ініціалізація Swiper
  const initSwiper = () => {
    new Swiper('.success-stories__slider', {
      modules: [Navigation, Pagination],
      slidesPerView: 1,
      spaceBetween: 24,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
      },
      loop: false,
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
        1440: {
          // десктоп
          slidesPerView: 2,
        },
      },
    });
  };

  // Запит до API
  const fetchFeedbacks = async () => {
    loader.style.display = 'block';
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Помилка завантаження відгуків');
      const data = await res.json();

      const feedbacks = data.feedbacks;

      if (!feedbacks.length || feedbacks.length < 3)
        throw new Error('Недостатньо відгуків');
      renderFeedbacks(feedbacks);
      initSwiper();
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Помилка!',
        text: 'Не вдалося завантажити відгуки',
      });
    } finally {
      loader.style.display = 'none';
    }
  };

  fetchFeedbacks();
});
