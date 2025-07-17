import { useMutation } from '@tanstack/react-query';
import httpClient from '../../apis/httpClient';

type CreateUserPostPayload = {
  user_id: number;
  title: string;
  body: string;
};

export const useCreatePost = () => {
  return useMutation({
    mutationFn: (payload: CreateUserPostPayload) =>
      httpClient.post('public/v2/posts', payload).then(res => res.data),
  });
};
