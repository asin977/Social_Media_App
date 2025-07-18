import { useMutation } from '@tanstack/react-query';

import httpClient from '../../apis/httpClient';
import { endpoints } from '../endpoints';

type CreateUserPostPayload = {
  user_id: number;
  title: string;
  body: string;
};

export const useCreatePost = () => {
  return useMutation({
    mutationFn: async (payload: CreateUserPostPayload) => {
      const { user_id, ...rest } = payload;
      const response = await httpClient.post(endpoints.createUserPost(user_id), rest);
      return response.data;
    },
  });
};
