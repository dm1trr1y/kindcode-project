import { server } from './serverConfig';

//:  запит на Категорії
export async function getAllCategories() {
  return server.get(`/api/categories`).then(res => res.data);
}

//:  запит на Список Тварин
export async function getPetList(id) {
  return server.get(`/api/animals/${id}`).then(res => res.data);
}
