import api from '../services/apiClient';
import { User } from '../types/user';
import { APIEndPoints } from './endpoints';

export const fetchUsers = async (): Promise<User[]> => {
  const response = await api.get(APIEndPoints.USERS);
  return response.data;
};
