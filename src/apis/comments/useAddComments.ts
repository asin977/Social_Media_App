import { useMutation, useQueryClient } from '@tanstack/react-query';

import httpClient from '../httpClients';
import { endpoints } from '../endPoints';

type UserComment = {
  postId: number;
  name: string;
  body: string;
  id?: number;
  email: string;
};

type UserCommentInput = {
  postId: number;
  name: string;
  body: string;
  email: string;
};

export const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation<UserComment, Error, UserCommentInput>({
    mutationFn: async ({ postId, name, email, body }) => {
      const response = await httpClient.post(
        endpoints.addCommentToPost(postId),
        { postId, name, email, body },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
};
