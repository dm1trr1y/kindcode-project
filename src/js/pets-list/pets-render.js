//: пошук DOM елементів
const refs = {
  petList: document.querySelector('.pet-list'),
  nameContainer: document.querySelector('.pet-name-container'),
  categories: document.querySelector('.pet-categories-list'),
  loadMoreBtn: document.querySelector('.js-btn-load'),
};

// деструктуризація
const { categories, petList, loadMoreBtn, nameContainer } = refs;

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

//: ф-я ТЕМПЛЕЙТУ розмітки Списку

function petListTemplate({
  _id,
  name,
  categories,
  image,
  species,
  age,
  gender,
  shortDescription,
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
        <div class="pet-category-tag">${tagsMarkup}</div>
        </div>
      

       <div class="pet-info-bottom">
        <div class="pet-info-container">
          <p class="pet-age">${age}</p>
          <p class="pet-gender">${gender}</p>
        </div>
        <p class="pet-desc">${shortDescription}</p>
        <button class="btn-more" data-id="${_id}">Дізнатися більше</button>
      </div>
     
      
      </li>`;
}

const loader = document.querySelector('.js-preloader-pet-list');

export function showLoader() {
  if (!loader) return;

  loader.style.display = 'flex'; // або block
  requestAnimationFrame(() => {
    loader.classList.add('is-visible');
  });
}

export function hideLoader() {
  if (!loader) return;

  loader.classList.remove('is-visible');

  setTimeout(() => {
    loader.style.display = 'none';
  }, 400); // має співпадати з transition у CSS
}

//: ф-я РЕНДЕРУ розмітки Списку

export function createPetList(data) {
  const markup = data.map(petListTemplate).join('');
  petList.innerHTML = markup;
  return markup;
}

export function showLoadBtn() {
  if (loadMoreBtn.classList.contains('hidden')) {
    loadMoreBtn.classList.remove('hidden');
  }
}

export function hideLoadBtn() {
  if (!loadMoreBtn.classList.contains('hidden')) {
    loadMoreBtn.classList.add('hidden');
  }
}

export function loadMorePetList(data) {
  const markup = data.map(petListTemplate).join('');
  petList.insertAdjacentHTML('beforeend', markup);
  return markup;
}
