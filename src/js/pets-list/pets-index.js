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
  categoriesListElem: document.querySelector('.pet-categories-list'),
  categoryBtnAll: document.querySelector('#all-btn'),
};

//: деструктуризація
const { loadMoreBtn, categoryBtn, categoriesListElem, categoryBtnAll } = refs;
console.log();

let PER_PAGE = 8;
let PAGE = 1;
let CATEG_ID = '';

// let totalPages;
// ; Не закоментовувати!
let categoriesList;

//: івент DOMLoader
// ліміт для сторінки в певнопу діапазоні для моб,таблет,дестоп
// є відслудковування різних розмірів екрану подія
//

window.addEventListener('DOMContentLoaded', async e => {
  try {
    // запит на всі категорії
    const categoryData = await getAllCategories();
    createCategoriesList(categoryData);
    console.log('category data: ', categoryData);

    // створення кнопок категорії
    categoriesList = Array.from(document.querySelectorAll('.pet-category-btn'));

    categoriesList
      .sort((a, b) => a.textContent.trim().localeCompare(b.textContent.trim()))
      .forEach(btn => categoriesListElem.appendChild(btn));

    const petListData = await getPetListAll(PAGE, PER_PAGE);
    console.log('petlist data: ', petListData);

    createPetList(petListData.animals);
  } catch {
    console.log('Error');
  }

  // прослуховувач та події для отримання та створення розмітки карток
  categoriesListElem.addEventListener('click', async event => {
    // closest потрібен для того щоб перевірити чи було нажато на саму кнопку
    const categoryBtn = event.target.closest('.pet-category-btn');
    if (!categoryBtn) return;

    // проходження по масиву та видалення всих active
    categoriesList.forEach(el => el.classList.remove('active'));
    // додати до кнопки на яку було нажато клас active
    categoryBtn.classList.add('active');

    // виклик функцій запиту та рендеру всіх або фільтрованих категорій
    if (categoryBtnAll.classList.contains('active')) {
      const petListData = await getPetListAll(PAGE, PER_PAGE);
      createPetList(petListData.animals);
    } else {
      CATEG_ID = categoryBtn.dataset.id;
      const petListData = await getPetListFiltered(CATEG_ID, PAGE, PER_PAGE);
      createPetList(petListData.animals);
    }
  });
});

// LoadMore Button
// LOADER
// CSS fix
