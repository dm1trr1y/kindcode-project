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
  showLoadBtn,
  hideLoadBtn,
  showLoader,
  hideLoader,
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
const { loadMoreBtn, categoriesListElem, categoryBtnAll } = refs;

let PER_PAGE = getLimitByScreen();
let PAGE;
let RECT;
let TOTAL_PAGES;
let ACTIVE_CATEGORY_ID = null;
let categoriesList;

//: івент DOMLoader

function getLimitByScreen() {
  const width = window.innerWidth;

  if (width < 768) return 8; // mobile
  if (width < 1024) return 8; // tablet
  return 9; // desktop
}
window.addEventListener('resize', () => {
  const newLimit = getLimitByScreen();
  if (newLimit !== PER_PAGE) {
    PER_PAGE = newLimit;
  }
});

window.addEventListener('DOMContentLoaded', async e => {
  try {
    const categoryData = await getAllCategories();
    createCategoriesList(categoryData);
    PAGE = 1;

    // створення кнопок категорії
    categoriesList = Array.from(document.querySelectorAll('.pet-category-btn'));
    console.log(categoriesList);

    // сортування по останній цифрі айді
    categoriesList
      .sort((a, b) => {
        const aId = Number(a.dataset.id.slice(-1));
        const bId = Number(b.dataset.id.slice(-1));
        return aId - bId;
      })
      .forEach(btn => categoriesListElem.appendChild(btn));

    if (categoryBtnAll.classList.contains('active')) {
      const petListData = await getPetListAll(PAGE, PER_PAGE);

      TOTAL_PAGES = Math.ceil(petListData.totalItems / PER_PAGE);
      checkBtnStatus();

      createPetList(petListData.animals);
    } else {
      return;
    }
  } catch {
    //! додати повідомлення
    console.log('Error');
  }

  // прослуховувач та події для отримання та створення розмітки карток
  categoriesListElem.addEventListener('click', async event => {
    PAGE = 1;

    // closest потрібен для того щоб перевірити чи було нажато на саму кнопку
    const categoryBtn = event.target.closest('.pet-category-btn');
    if (!categoryBtn) return;

    // проходження по масиву та видалення всих active
    categoriesList.forEach(el => el.classList.remove('active'));
    // додати до кнопки на яку було нажато клас active
    categoryBtn.classList.add('active');

    // виклик функцій запиту та рендеру всіх або фільтрованих категорій
    if (categoryBtnAll.classList.contains('active')) {
      ACTIVE_CATEGORY_ID = null;
      showLoader();
      const petListData = await getPetListAll(PAGE, PER_PAGE);
      createPetList(petListData.animals);

      hideLoadBtn();
      TOTAL_PAGES = Math.ceil(petListData.totalItems / PER_PAGE);
      hideLoader();
      checkBtnStatus();
    } else {
      showLoader();
      ACTIVE_CATEGORY_ID = categoryBtn.dataset.id;

      const petListData = await getPetListFiltered(
        ACTIVE_CATEGORY_ID,
        PAGE,
        PER_PAGE
      );
      createPetList(petListData.animals);
      hideLoader();
      hideLoadBtn();
      TOTAL_PAGES = Math.ceil(petListData.totalItems / PER_PAGE);
      checkBtnStatus();
    }
  });
});

//: прослуховувач load more btn
loadMoreBtn.addEventListener('click', async event => {
  PAGE += 1;

  const itemContainer = document.querySelector('.pet-item-container');
  RECT = itemContainer.getBoundingClientRect();
  showLoader();
  hideLoadBtn();

  if (ACTIVE_CATEGORY_ID === null) {
    const petListData = await getPetListAll(PAGE, PER_PAGE);

    loadMorePetList(petListData.animals);

    TOTAL_PAGES = Math.ceil(petListData.totalItems / PER_PAGE);
    hideLoader();
    checkBtnStatus();
  } else {
    const petListData = await getPetListFiltered(
      ACTIVE_CATEGORY_ID,
      PAGE,
      PER_PAGE
    );
    loadMorePetList(petListData.animals);
    TOTAL_PAGES = Math.ceil(petListData.totalItems / PER_PAGE);
    hideLoader();
    checkBtnStatus();
  }

  checkBtnStatus();

  window.scrollBy({
    top: RECT.height * 1,
    behavior: 'smooth',
  });
});

//: Ф-я перевірки статусу кнопки
function checkBtnStatus() {
  if (PAGE < TOTAL_PAGES) {
    showLoadBtn();
  } else {
    hideLoadBtn();
  }
}
