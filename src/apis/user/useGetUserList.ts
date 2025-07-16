import { useQuery } from '@tanstack/react-query';

import { DataQueryKeys } from '../data-query-keys';
import httpClient from '../httpClient';
import { endpoints } from '../endpoints';
import { UserListAPIResponse } from '../../types/user';

export const useGetUserList = () => {
  return useQuery<UserListAPIResponse[], Error>({
    queryKey: [DataQueryKeys.USER],
    queryFn: async () => {
      const { data } = await httpClient.get(endpoints.getUserList());
      return data;
    },
  });
};
