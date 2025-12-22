import { hideLoader, showLoader } from './pets-render';
import { server } from './serverConfig';
export const animalsMap = new Map();
//:  запит на Категорії
export async function getAllCategories() {
  showLoader();
  const res = await server.get(`/api/categories`);
  hideLoader();
  return res.data;
}

//:  запит на Список ВСИХ Тварин
export async function getPetListAll(PAGE, PER_PAGE) {
  showLoader();
  const res = await server.get(`/api/animals/`, {
    params: {
      limit: PER_PAGE,
      page: PAGE,
    },
  });
  res.data.animals.forEach(animal => {
    animalsMap.set(animal._id, animal);
  });
  hideLoader();
  return res.data;
}

//:  запит на Список Тварин по категорії
export async function getPetListFiltered(CATEG_ID, PAGE, PER_PAGE) {
  showLoader();
  const res = await server.get(`/api/animals/`, {
    params: {
      limit: PER_PAGE,
      page: PAGE,
      categoryId: CATEG_ID,
    },
  });
  res.data.animals.forEach(animal => {
    animalsMap.set(animal._id, animal);
  });
  hideLoader();
  return res.data;
}
