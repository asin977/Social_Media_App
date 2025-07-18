import { useMutation, useQueryClient } from '@tanstack/react-query';

import { CreateUserPostPayload, Posts } from '../../types/posts';
import { DataQueryKeys } from '../data-query-keys';
import { endpoints } from '../endpoints';
import httpClient from '../httpClient';

export const useCreateUserPost = () => {
  const queryClient = useQueryClient();

  return useMutation<Posts, Error, CreateUserPostPayload>({
    mutationFn: (payload: CreateUserPostPayload) =>
      httpClient
        .post(endpoints.createUserPost(payload.user_id), payload)
        .then(res => res.data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [DataQueryKeys.POST_LIST],
      });
    },
  });
};
