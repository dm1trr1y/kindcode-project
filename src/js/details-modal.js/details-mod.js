import axios from 'axios';
// тестовий варіант коду, щоб розібратися як буде працювати відповідь сервера //
const BASE_URL = 'https://paw-hut.b.goit.study';
const END_POINT = '/api/animals';
const url = `${BASE_URL}${END_POINT}`;

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

  // try {
  //   const res = await axios.get(`${BASE_URL}${END_POINT}`);

  //   const animal = res.data.animals.find(pet => pet._id === chosenPetId);
  //   // console.log(animal);
  //   responseData = animal;
  // } catch (err) {
  //   console.error(err);
  // }
  // console.log('responseData: ', responseData);
  if (!responseData) return;
  // звідси починається розмітка, готова до виведення в модалку //
  refs.img.src = responseData.image;
  console.log('responseData.image: ', responseData.image);
  refs.img.alt = responseData.name;
  refs.species.textContent = responseData.species;
  console.log('responseData.species: ', responseData.species);
  refs.name.textContent = responseData.name;
  console.log('responseData.name: ', responseData.name);
  refs.age.textContent = responseData.age;
  console.log('responseData.age: ', responseData.age);
  refs.gender.textContent = responseData.gender;
  console.log('responseData.gender: ', responseData.gender);
  refs.descr.textContent = responseData.description;
  console.log('responseData.description: ', responseData.description);
  refs.health.textContent = responseData.healthStatus;
  console.log('responseData.healthStatus: ', responseData.healthStatus);
  refs.behavior.textContent = responseData.behavior;
  console.log('responseData.behavior: ', responseData.behavior);

  refs.btnSubmit.dataset.petId = responseData._id;
  console.log('responseData._id: ', responseData._id);
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
  openOrderModal(petId);
  closeModal();
});
