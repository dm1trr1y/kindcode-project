import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const API_URL = 'https://paw-hut.b.goit.study/api/feedbacks';

document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.getElementById('feedbacks-wrapper');
  const loader = document.getElementById('loader');
  const toastContainer = document.getElementById('toast-container');

  if (!wrapper || !loader || !toastContainer) return;

  // Функція для тостів
  const showToast = msg => {
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.textContent = msg;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
  };

  // Рейтинг зірочками
  const renderRating = (container, rating) => {
    const percent = (rating / 5) * 100;
    container.innerHTML = `<div class="star-rating"><span style="width:${percent}%"></span></div>`;
  };

  // Створення карток
  const renderFeedbacks = feedbacks => {
    wrapper.innerHTML = '';
    feedbacks.forEach(({ rating, text, user }) => {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      slide.innerHTML = `
        <article class="feedback-card">
          <div class="feedback-card__rating"></div>
          <p class="feedback-card__text">${text}</p>
          <span class="feedback-card__author">${user}</span>
        </article>`;
      wrapper.appendChild(slide);
      renderRating(slide.querySelector('.feedback-card__rating'), rating);
    });
  };

  // Ініціалізація Swiper
  const initSwiper = () => {
    new Swiper('.success-stories__slider', {
      slidesPerView: 1,
      spaceBetween: 24,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
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
      if (!data.length || data.length < 3)
        throw new Error('Недостатньо відгуків');
      renderFeedbacks(data);
      initSwiper();
    } catch (err) {
      showToast(err.message);
    } finally {
      loader.style.display = 'none';
    }
  };

  fetchFeedbacks();
});
