import axios from 'axios';

const BASE_URL = 'https://gorest.co.in';
const TOKEN =
  'bf7188bafc33522355d94c5dc844a2a3ecb964f8106af3fb75be425c587a376b';

const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export default httpClient;
