import axios from 'axios';

//:  запит до Серверу
export const server = axios.create({
  baseURL: 'https://paw-hut.b.goit.study',
});
