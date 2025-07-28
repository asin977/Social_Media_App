import { useQuery } from '@tanstack/react-query';

import { DataQueryKeys } from '../data-query-keys';
import httpClient from '../httpClient';
import { endpoints } from '../endpoints';
import { Posts } from '../../types/posts';

export const useGetUserPosts = () => {
  return useQuery<Posts[]>({
    queryKey: [DataQueryKeys.POST_LIST],
    queryFn: async () => {
      const { data } = await httpClient.get(endpoints.getPosts());
      return data;
    },
  });
};
