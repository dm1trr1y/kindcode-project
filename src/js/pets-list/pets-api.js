import { server } from './serverConfig';

//:  запит на Категорії
export async function getAllCategories() {
  const res = await server.get(`/api/categories`);
  return res.data;
}

//:  запит на Список Тварин
export async function getPetList(id, limit) {
  const res = await server.get(`/api/animals/`, {
    params: {
      limit: limit,
      _id: id,
    },
  });
  return res.data;
}
