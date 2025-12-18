import { server } from './serverConfig';

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
  return res.data;
}
