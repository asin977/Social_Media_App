import { useQuery } from '@tanstack/react-query';

import { DataQueryKeys } from '../data-query-keys';
import httpClient from '../httpClient';
import { endpoints } from '../endpoints';
import { UserListAPIResponse } from '../../types/user';

export const useGetUserList = () => {
  return useQuery<UserListAPIResponse[]>({
    queryKey: [DataQueryKeys.USERS_LIST],
    queryFn: async () => {
      const { data } = await httpClient.get(endpoints.getUserList());
      return data;
    },
  });
};
