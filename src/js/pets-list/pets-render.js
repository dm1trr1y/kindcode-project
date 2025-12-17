//: пошук DOM елементів
const refs = {
  categories: document.querySelector('.pet-categories-list'),
  petList: document.querySelector('.pet-list'),
  loadMoreBtn: document.querySelector('.js-btn-load'),
};

// деструктуризація
const { categories, petList, LoadMoreBtn } = refs;

//: ф-я ТЕМПЛЕЙТУ розмітки Фільтру
function filterTemplate({ _id, name }) {
  return `<button class="pet-category-btn" data-id="${_id}">${name}</button>`;
}

//: ф-я РЕНДЕРУ розмітки Фільтру

export function createCategoriesList(data) {
  const markup = data.map(filterTemplate).join('');
  categories.insertAdjacentHTML('beforeend', markup);
  return markup;
}

//: ф-я ТЕМПЛЕЙТУ розмітки Списку

function petListTemplate({
  petName,
  petCategories,
  petImageLink,
  petSpecies,
  petAge,
  petGender,
  petDesctiprion,
}) {
  return `
     <li class="pet-item-container">
        <img src="${petImageLink}" alt="image" class="pet-img">
        <p class="pet-species">${petSpecies}</p>

        <div class="pet-name-container">
          <h3 class="pet-name">${petName}</h3>
          <p class="pet-categories">${petCategories}</p>
        </div>

        <div class="pet-info-container">
          <p class="pet-age">${petAge}</p>
          <p class="pet-gender">${petGender}</p>
        </div>
        <p class="pet-desc">${petDesctiprion}</p>
        <button class="btn-more">Дізнатися більше</button>
      </li>`;
}

//: ф-я РЕНДЕРУ розмітки Списку

export function createPetList(data) {
  const markup = data.map(petListTemplate).join('');
  petList.innerHTML = markup;
  return markup;
}

export function loadMorePetList(data) {
  const markup = data.map(petListTemplate).join('');
  petList.insertAdjacentHTML('beforeend', markup);
  return markup;
}

export function clearPetList() {
  petList.innerHTML = '';
}

//: DOM render the filter buttons
//

//: DOM render the pet item

// Опис функціоналу:

// "При відкритті сторінки додатку повинні відображатись кнопки з фільтрами по категоріям отримані з БД  за допомогою запиту наданого в завданні API, маршрут - /api/categories.
// Кнопка Всі активна за замовчуванням, клік по даній кнопці виконує запит за тваринами всіх категорій."

//; яким чином виконує запит?
//; варіанти: listener на обновлення сторінки

// "При відкритті сторінки додатку за замовчуванням повинно відображатись:
// -9 карток з тваринами - на десктопі,
// -8 карток з тваринамина - на планшеті та мобілці,"
// Картки з тваринами створюються на основі даних, отриманих в запиті до БД за допомогою наданого в завданні API, маршрут - /api/animals.
// При кліку на обрану зі списку категорію елемент з даною категорією повинен набути стилі акценту.
// При кліку на обрану зі списку категорію, повинен відбутись запит до БД і список тварин повинен бути відфільтрований, відображаючи тільки тварин з обраної категорії.
// При кліку по кнопці «Дізнатись більше» на картці тварини, відкривається модальне вікно з детальною інформацією про неї.
// "Кнопка «Завантажити ще» завантажує наступну порцію тварин:
// - 9 елементів - десктоп,
// - 8 елементів - планшет та мобілка.
// і додає їх до вже відображених."
// Якщо більше немає тварин для завантаження, кнопка "Завантажити ще" зникає або стає неактивною.
// "При наведенні на кнопки повинен змінюватись курсор.
// При наведенні, фокусі або кліку у кнопок повинні змінюватись стилі відповідно до шаблону UI Kit в макеті."
