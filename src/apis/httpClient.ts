import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'https://gorest.co.in/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `bf7188bafc33522355d94c5dc844a2a3ecb964f8106af3fb75be425c587a376b`,
  },
});

export default httpClient;
