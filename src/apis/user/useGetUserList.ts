import { useQuery } from '@tanstack/react-query';

import { DataStorageKeys } from '../data-query-keys';
import httpClient from '../httpClient';
import { endpoints } from '../endpoints';
import { UserListAPIResponse } from '../../types/user';

export const useGetUserList = () => {
  return useQuery<UserListAPIResponse[]>({
    queryKey: [DataStorageKeys.USER_LIST],
    queryFn: async () => {
      const { data } = await httpClient.get(endpoints.getUserList());
      return data;
    },
  });
};
