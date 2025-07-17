import { UpdateUserPayLoad, UserListAPIResponse } from '../../types/user';
import { endpoints } from '../endpoints';
import httpClient from '../httpClient';

export const useUpdateUserList = async (
  payload: UpdateUserPayLoad,
): Promise<UserListAPIResponse> => {
  const { id, ...dataToUpdate } = payload;
  const response = await httpClient.put(
    endpoints.getUserDetails(String(id)),
    dataToUpdate,
  );
  return response.data;
};
