import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify'

import { DataQueryKeys } from '../data-query-keys';
import httpClient from '../httpClients';
import { endpoints } from '../endPoints';

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (id: number) => {
      const response = await httpClient.delete<void>(
        endpoints.deleteComments(id),
      );

      if (!response.config) {
        throw new Error('Failed to delete user.');
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DataQueryKeys.COMMENT_LIST] });
      toast.success('User deleted successfully!', {
        position: 'top-right',
      });
    },
    onError: error => {
      console.error('Error deleting user:', error);
      toast.error(`Error deleting user: ${error.message || 'Unknown error'}`, {
        position: 'top-right',
      });
    },
  });
};
