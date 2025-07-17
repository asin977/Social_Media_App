import { useMutation, useQueryClient } from '@tanstack/react-query';
import httpClient from '../httpClient';
import { CreateUserPostPayload, Posts } from '../../types/posts';
import { endpoints } from '../endpoints';
import { DataQueryKeys } from '../data-query-keys';

export const useCreateUserPost = () => {
  const queryClient = useQueryClient();

  return useMutation<Posts, Error, CreateUserPostPayload>({
    mutationFn: (payload: CreateUserPostPayload) =>
      httpClient
        .post(endpoints.createUserPost(payload.user_id.toString()), payload)
        .then(res => res.data),

    // 🔁 Trigger posts refetch after a post is created
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [DataQueryKeys.POST_LIST],
      });
    },
  });
};
