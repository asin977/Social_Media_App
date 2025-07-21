import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ToastContainer, toast } from 'react-toastify';

import { DataQueryKeys } from '../data-query-keys';
import httpClient from '../httpClients';
import { endpoints } from '../endPoints';

const deleteComments = async ( post_id: number) => {
  const response = await httpClient.delete<void>(endpoints.deleteComments( post_id));
  return response.data;
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: deleteComments,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DataQueryKeys.COMMENT_LIST] });
      toast.success('User deleted successfully...');
    },
    onError: error => {
      toast.error('Error deleting User..');
    },
  });
};
