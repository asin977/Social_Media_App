import { useMutation, useQueryClient } from '@tanstack/react-query';

import httpClient from '../httpClient';
import { endpoints } from '../endpoints';

type UserPost = {
  userId: number;
  title: string;
  body: string;
  id?: number;
};

type UserPostInput = {
  userId: number;
  title: string;
  body: string;
};

export const useCreateUserPost = () => {
  const queryClient = useQueryClient();

  return useMutation<UserPost, Error, UserPostInput>({
    mutationFn: async ({ userId, title, body }) => {
      const response = await httpClient.post(
        endpoints.createUserPost(userId),
        { userId, title, body },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};
