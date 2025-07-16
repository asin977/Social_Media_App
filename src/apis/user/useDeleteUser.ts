import { useMutation, useQueryClient } from '@tanstack/react-query';

import { DataQueryKeys } from '../data-query-keys';
import httpClient from '../httpClient';

const deleteUserRequest = async (userId: string) => {
  const response = await httpClient.delete<void>(`public/v2/users/${userId}`);
  return response.data;
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: deleteUserRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DataQueryKeys.USER] });
      console.log('User deleted Successfully!..');
    },
    onError: error => {
      console.error('Error deleting User', error);
    },
  });
};
