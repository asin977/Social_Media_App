import httpClient from '../httpClient';
import { UserListAPIResponse, UpdateUserPayLoad } from '../../types/user';

export const useUpdateUserDetails = async (
  payload: UpdateUserPayLoad,
): Promise<UserListAPIResponse> => {
  const { id, ...dataToUpdate } = payload;
  const response = await httpClient.put(`public/v2/users/${id}`, dataToUpdate);
  return response.data;
};
