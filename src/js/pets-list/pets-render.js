//: пошук DOM елементів
const refs = {
  petList: document.querySelector('.pet-list'),
  nameContainer: document.querySelector('.pet-name-container'),
  categories: document.querySelector('.pet-categories-list'),
  loadMoreBtn: document.querySelector('.js-btn-load'),
};

// деструктуризація
const { categories, petList, LoadMoreBtn, nameContainer } = refs;

//: ф-я ТЕМПЛЕЙТУ розмітки Фільтру
function filterTemplate({ _id, name }) {
  return `<button class="pet-category-btn" data-id="${_id}">${name}</button>`;
}

//: ф-я РЕНДЕРУ розмітки Фільтру

export function createCategoriesList(categoryData) {
  const markup = categoryData.map(filterTemplate).join('');
  categories.insertAdjacentHTML('beforeend', markup);
  return markup;
}

let tagsArr;

//: ф-я ТЕМПЛЕЙТУ розмітки Списку

function petListTemplate({
  _id,
  name,
  categories,
  image,
  species,
  age,
  gender,
  description,
}) {
  const tagsMarkup = categories
    .map(category => `<p class="pet-categories">${category.name}</p>`)
    .join('');

  return `
     <li class="pet-item-container">
        <img src="${image}" alt="image" class="pet-img">
        <p class="pet-species">${species}</p>

        <div class="pet-name-container">
          <h3 class="pet-name">${name}</h3>
         ${tagsMarkup}
        </div>

        <div class="pet-info-container">
          <p class="pet-age">${age}</p>
          <p class="pet-gender">${gender}</p>
        </div>
        <p class="pet-desc">${description}</p>
        <button class="btn-more" data-id="${_id}">Дізнатися більше</button>
      </li>`;
}

// window.addEventListener('load', function () {
//   var loader = document.querySelector('.js-preloader');
//   if (loader) {
//     loader.style.transition = 'opacity 1s ease-in-out';
//     loader.style.opacity = '0';
//     this.setTimeout(function () {
//       loader.style.display = 'none';
//     }, 6000);
//   }
// });

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
