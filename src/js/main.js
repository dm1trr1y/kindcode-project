import './details-modal.js/details-mod.js';
import { getAnimal } from './details-modal.js/details-mod.js';
import './order-modal.js';
import { initOrderModal, openOrderModal } from './order-modal.js';
import './header';
import './preloader.js';
import {} from './pets-list/pets-index';
import './about-us/about.js';
import './faq.js';
import './stories.js';
import { animalsMap } from './pets-list/pets-api.js';

initOrderModal();

// const petList = document.querySelector('.pet-list');

// petList.addEventListener('click', e => {
//   if (e.target.id === 'js-btn-more') {
//     getAnimal(e.target.dataset._id);
//   }
// });
const petList = document.querySelector('.pet-list');

petList.addEventListener('click', event => {
  const btn = event.target.closest('#js-btn-more');

  if (!btn) return; // клик не по кнопке

  const id = btn.dataset.id;
  const animal = animalsMap.get(id);

  // if (!animal) {
  //   console.warn('Animal not found:', id);
  //   return;
  // }
  getAnimal(animal);
});
