import { useQuery } from '@tanstack/react-query';

import { DataQueryKeys } from '../data-query-keys';
import httpClient from '../httpClients';
import { endpoints } from '../endPoints';
import { UserListAPIResponse } from '../../types/users';

export const useGetUserList = () => {
  return useQuery<UserListAPIResponse[]>({
    queryKey: [DataQueryKeys.USER_LIST],
    queryFn: async () => {
      const { data } = await httpClient.get(endpoints.getUserList());
      return data;
    },
  });
};
