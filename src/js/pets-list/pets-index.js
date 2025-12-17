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
  // categoryAllBtn: document.querySelector('#all-btn'),
};

//: деструктуризація
const { loadMoreBtn, categoryBtn, categoryAllBtn } = refs;

const PER_PAGE = 9;
let page;
let query; // для збереження пошуку
let totalPages;

//: івент DOMLoader

window.addEventListener('DOMContentLoaded', async e => {
  e.preventDefault();

  // const id =
  // page = 1;
  let categoriesList;

  try {
    const res = await getAllCategories();
    createCategoriesList(res);

    categoriesList = document.querySelectorAll('.pet-category-btn');
    console.log(categoriesList);
  } catch {
    console.log('Error');
  }

  categoriesList.forEach(categoryBtn => {
    categoryBtn.addEventListener('click', () => {
      categoriesList.forEach(el => {
        el.classList.remove('active');
      });
      categoryBtn.classList.add('active');
    });
  });
});

// визначити що підгружає і як ВСІ картинки коли кнопка ВСІ є active
//  далі зробити функцію очистки тоді коли перемикаємо і щоб воно прогружало тільки
// ті картинки в якій є айддішка
// тобто потрібно дати айдішку функції і вона вже повертає картинки тільки
// якщо вона містить ту айдішку
