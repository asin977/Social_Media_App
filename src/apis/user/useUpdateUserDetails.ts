import httpClient from '../httpClient';
import { UserListAPIResponse, UpdateUserPayLoad } from '../../types/user';
import { endpoints } from '../endpoints';

export const useUpdateUserDetails = async (
  payload: UpdateUserPayLoad,
): Promise<UserListAPIResponse> => {
  const { id, ...dataToUpdate } = payload;
  const response = await httpClient.put(
    endpoints.getUserDetails(String(id)),
    dataToUpdate,
  );
  return response.data;
};
