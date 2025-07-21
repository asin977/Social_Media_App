import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { DataQueryKeys } from '../data-query-keys';
import httpClient from '../httpClients';
import { endpoints } from '../endPoints';

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (commentId: number) => {
      await httpClient.delete(endpoints.deleteComments(commentId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DataQueryKeys.COMMENT_LIST] });
      toast.success('Comment deleted successfully!', {
        position: 'top-right',
      });
    },
    onError: (error) => {
      console.error('Error deleting comment:', error);
      toast.error(`Error deleting comment: ${error.message || 'Unknown error'}`, {
        position: 'top-right',
      });
    },
  });
};
