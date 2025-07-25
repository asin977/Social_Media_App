import { useQuery } from '@tanstack/react-query';

import { DataQueryKeys } from '../data-query-keys';
import { UserListAPIResponse } from '../../types/user';
import httpClient from '../httpClient';
import { endpoints } from '../endpoints';

export const useGetUserList = () => {
  return useQuery<UserListAPIResponse[]>({
    queryKey: [DataQueryKeys.USER_LIST],
    queryFn: async () => {
      const response = await httpClient.get<UserListAPIResponse[]>(
        endpoints.getUserList()
      );
      
      return response.data;
    },
  });
};
