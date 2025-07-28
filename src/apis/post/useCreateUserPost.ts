import { useMutation, useQueryClient } from '@tanstack/react-query';

import httpClient from '../httpClient';
import { endpoints } from '../endpoints';

type UserPost = {
  user_id: number;
  title: string;
  body: string;
  id?: number;
};

type UserPostInput = {
  user_id: number;
  title: string;
  body: string;
};

export const useCreateUserPost = () => {
  const queryClient = useQueryClient();

  return useMutation<UserPost, Error, UserPostInput>({
    mutationFn: async ({ user_id, title, body }) => {
      const response = await httpClient.post(
        endpoints.createUserPost(user_id),
        { user_id, title, body },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};
