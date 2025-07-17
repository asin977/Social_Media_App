import httpClient from '../httpClient';
import { UserListAPIResponse } from '../../types/user';
import { endpoints } from '../endpoints';

export const addUser = async (payload: Partial<UserListAPIResponse>) => {
  const response = await httpClient.post(endpoints.getUserList(),payload);

  if (!response || response.status !== 201) {
    const data = response.data;
    throw new Error(
      Array.isArray(data) && data.length > 0
        ? data[0].message
        : data?.message || 'Failed to add user'
    );
  }

  return response.data;
};
