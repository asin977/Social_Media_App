import { useQuery } from '@tanstack/react-query';
import httpClient from '../httpClient';
import { endpoints } from '../endpoints';
import { DataQueryKeys } from '../data-query-keys';

export const useGetUserPosts = () => {
  return useQuery({
    queryKey: [DataQueryKeys.POST_LIST], 
    queryFn: async () => {
      const response = await httpClient.get(endpoints.getPosts());
      return response.data;
    },
  });
};
