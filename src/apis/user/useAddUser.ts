import { useMutation, useQueryClient } from '@tanstack/react-query';
import { endpoints } from '../endpoints';
import httpClient from '../httpClient';
import { UserListAPIResponse } from '../../types/user';
import { DataQueryKeys } from '../data-query-keys';

const addUserRequest = async (payload: Partial<UserListAPIResponse>) => {
  const response = await httpClient.post(endpoints.createUser(), payload);
  return response.data;
};

export const useAddUser = (p0: { onSuccess: () => void; onError: (err: any) => void; }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addUserRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DataQueryKeys.USER_LIST] });
    },
  });
};
