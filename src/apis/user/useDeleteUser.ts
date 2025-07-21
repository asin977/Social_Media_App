import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { DataQueryKeys } from '../data-query-keys';
import httpClient from '../httpClient';
import { endpoints } from '../endpoints';

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (userId: string) => {
      const response = await httpClient.delete<void>(
        endpoints.deleteUser(userId),
      );

      if (!response.config) {
        throw new Error('Failed to delete user.');
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DataQueryKeys.USER_LIST] });
      toast.success('User deleted successfully!', {
        position: 'top-right',
        autoClose: 2000,
      });
    },
    onError: error => {
      console.error('Error deleting user:', error);
      toast.error(`Error deleting user: ${error.message || 'Unknown error'}`, {
        position: 'top-right',
        autoClose: 3000,
      });
    },
  });
};
