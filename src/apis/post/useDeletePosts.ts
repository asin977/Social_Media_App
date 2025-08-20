import { useMutation, useQueryClient } from '@tanstack/react-query';

import httpClient from '../httpClient';
import { endpoints } from '../endpoints';
import { DataQueryKeys } from '../data-query-keys';

const deletePostRequest = async (postId: number) => {
  const response = await httpClient.delete(endpoints.deletePost(postId));
  return response.data;
};

export const useDeletePosts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePostRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DataQueryKeys.POST_LIST] });
    },
  });
};
