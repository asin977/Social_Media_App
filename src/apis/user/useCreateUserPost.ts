import { useMutation, useQueryClient } from '@tanstack/react-query';
import httpClient from '../../apis/httpClient';
import { endpoints } from '../endpoints';

type CreateUserPostPayload = {
  user_id: number;
  title: string;
  body: string;
};

type CreateUserPostResponse = {
  id: number;
  title: string;
  body: string;
  user_id: number;
};

export const useCreateUserPost = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateUserPostResponse, Error, CreateUserPostPayload>({
    mutationFn: async ({ user_id, title, body }) => {
      const response = await httpClient.post(
        endpoints.createUserPost(user_id),
        { title, body,user_id },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: error => {
      console.error('Post creation failed:', error.message);
    },
  });
};
