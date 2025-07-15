import { useQuery } from '@tanstack/react-query';

import { DataQueryKeys } from '../data-query-keys';
import httpClient from '../httpClient';
import { endpoints } from '../endpoints';
import { Post } from '../../types/posts';

export const useGetUserPosts = () => {
  return useQuery<Post[], Error>({
    queryKey: [DataQueryKeys.USERS_LIST],
    queryFn: async () => {
      const { data } = await httpClient.get(endpoints.getPosts());
      return data;
    },
  });
};
