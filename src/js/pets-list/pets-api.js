import { server } from './serverConfig';

//:  запит на Категорії
export async function getAllCategories() {
  const res = await server.get(`/api/categories`);
  return res.data;
}

//:  запит на Список ВСІХ Тварин
export async function getPetListAll(limit) {
  const res = await server.get(`/api/animals/`, {
    params: {
      limit: limit,
    },
  });
  return res.data;

  //:  запит на Список Тварин по категорії
}
export async function getPetListFiltered(id, limit) {
  const res = await server.get(`/api/animals/`, {
    params: {
      limit: limit,
      categoryId: id,
    },
  });
  return res.data;
}
