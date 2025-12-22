import { openOrderModal } from '../order-modal.js';

function openModal() {
  document.querySelector('.details-modal').classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.querySelector('.details-modal').classList.remove('is-open');
  document.body.style.overflow = '';
}

const refs = {
  img: document.querySelector('.d-m-img'),
  species: document.querySelector('.d-m-species'),
  name: document.querySelector('.d-m-name'),
  age: document.querySelector('.d-m-age'),
  gender: document.querySelector('.d-m-gender'),
  descr: document.querySelector('.d-m-description'),
  health: document.querySelector('.d-m-health'),
  behavior: document.querySelector('.d-m-behavior'),
  close: document.querySelector('.d-m-close'),
  btnSubmit: document.querySelector('.d-m-submit'),
  modal: document.querySelector('.details-modal'),
};

export async function getAnimal(chosenPetId) {
  openModal();
  let responseData = chosenPetId;
  if (!responseData) return;

  refs.img.src = responseData.image;
  refs.img.alt = responseData.name;
  refs.species.textContent = responseData.species;
  refs.name.textContent = responseData.name;
  refs.age.textContent = responseData.age;
  refs.gender.textContent = responseData.gender;
  refs.descr.textContent = responseData.description;
  refs.health.textContent = responseData.healthStatus;
  refs.behavior.textContent = responseData.behavior;

  refs.btnSubmit.dataset.petId = responseData._id;
}

refs.close.addEventListener('click', e => {
  closeModal();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal();
  }
});

refs.modal.addEventListener('click', e => {
  if (e.target === refs.modal) {
    closeModal();
  }
});
refs.btnSubmit.addEventListener('click', () => {
  const petId = refs.btnSubmit.dataset.petId;
  closeModal();
  openOrderModal(petId);
});
