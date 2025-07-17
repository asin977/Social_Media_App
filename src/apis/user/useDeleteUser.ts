import { useMutation, useQueryClient } from '@tanstack/react-query';

import { DataQueryKeys } from '../data-query-keys';
import httpClient from '../httpClient';
import { endpoints } from '../endpoints';

const deleteUserRequest = async (userId: string) => {

  const response = await httpClient.delete<void>(`public/v2/users/${userId}`);
  
  //  const response = await httpClient.delete<void>(endpoints.getUserList(userId))

  return response.data;
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: deleteUserRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DataQueryKeys.USER_LIST] });
      alert('User deleted successfully...');
    },
    onError: error => {
      alert('Error deleting User,');
    },
  });
};
