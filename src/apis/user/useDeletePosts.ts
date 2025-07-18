import { useMutation, useQueryClient } from '@tanstack/react-query';

import { DataQueryKeys } from '../data-query-keys';
import httpClient from '../httpClient';
import { endpoints } from '../endpoints';

const deletePostRequest = async (userId: number) => {
  const response = await httpClient.delete<void>(endpoints.deletePost(userId));
  return response.data;
};

export const useDeletePosts = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: deletePostRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DataQueryKeys.POST_LIST] }); 
      alert('Post deleted Successfully..');
    },
    onError: error => {
      alert('Error deleting Post');
    },
  });
};
