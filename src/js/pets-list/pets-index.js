//: ф-ї API запитів
import { getAllCategories, getPetList } from './pets-api';

//: ф-ї рендеру
import {
  createCategoriesList,
  createPetList,
  clearPetList,
  loadMorePetList,
} from './pets-render';

//: пошук DOM елементів
const refs = {
  loadMoreBtn: document.querySelector('.js-btn-load'),
  categoryBtn: document.querySelector('.pet-category-btn'),
};

//: деструктуризація
const { loadMoreBtn, categoryBtn } = refs;

const PER_PAGE = 9;
let page;
let query; // для збереження пошуку
let totalPages;

//: івент DOMLoader

window.addEventListener('DOMContentLoaded', async e => {
  e.preventDefault();

  // const id =
  // page = 1;

  try {
    const res = await getAllCategories();
    createCategoriesList(res);
    console.log(res);
  } catch {
    console.log('Error');
  }
});
