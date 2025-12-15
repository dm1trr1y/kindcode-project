import axios from 'axios';
// const server = axios.create({});
// https://paw-hut.b.goit.study/api/categories

const server = axios.create({
  baseUrl: 'https://paw-hut.b.goit.study',
  params: {
    _id: '',
  },
});

export function getAnimal(id) {
  return server
    .get(`/api/animals/667ac6a4e4b0c8a2a7c1c1a1`)
    .then(res => res.data);
}

export function getCategory() {
  return server.get('/api/category').then(res => res.data);
}
