//: ф-ї API запитів
import {
  getAllCategories,
  getPetListAll,
  getPetListFiltered,
} from './pets-api';

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
let categoriesList;

//: івент DOMLoader

window.addEventListener('DOMContentLoaded', async e => {
  e.preventDefault();

  // const id =
  // page = 1;

  try {
    //- запит на всі категорії
    const categoryData = await getAllCategories();
    createCategoriesList(categoryData);

    //- створення кнопок категорії
    categoriesList = document.querySelectorAll('.pet-category-btn');

    let limit = 5;
    const petListData = await getPetListAll(limit);
    console.log(petListData);

    createPetList(petListData.animals);

    // if (condition) {
    // }
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
