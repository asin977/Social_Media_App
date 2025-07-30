import { useQuery } from '@tanstack/react-query';

import { DataQueryKeys } from '../data-query-keys';
import httpClient from '../httpClients';
import { endpoints } from '../endPoints';
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
