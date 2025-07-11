import axios from 'axios';

import { APIEndPoints } from '../apis/endpoints';

const apiClient = axios.create({
  baseURL: APIEndPoints.USERS,
  headers: {
    'content-Type': 'application/json',
  },
});

export default apiClient;
