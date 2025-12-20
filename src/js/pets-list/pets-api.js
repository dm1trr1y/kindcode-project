import { server } from './serverConfig';
export const animalsMap = new Map();
//:  запит на Категорії
export async function getAllCategories() {
  const res = await server.get(`/api/categories`);
  return res.data;
}

//:  запит на Список ВСИХ Тварин
export async function getPetListAll(PAGE, PER_PAGE) {
  const res = await server.get(`/api/animals/`, {
    params: {
      limit: PER_PAGE,
      page: PAGE,
    },
  });
  res.data.animals.forEach(animal => {
    animalsMap.set(animal._id, animal);
  });
  return res.data;
}

//:  запит на Список Тварин по категорії
export async function getPetListFiltered(CATEG_ID, PAGE, PER_PAGE) {
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
  return res.data;
}
