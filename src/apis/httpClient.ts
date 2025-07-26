import axios from 'axios';

const BASE_URL = 'https://gorest.co.in';
const TOKEN =
  '15ecd95a16ae3efdba08a9373b373cdfc9eb99dc9ca6f1da2d1be00b8ecc74ff';

const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export default httpClient;
