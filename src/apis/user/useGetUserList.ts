import { useQuery } from '@tanstack/react-query';

import { UserListAPIResponse } from '../../types/user';
import { DataQueryKeys } from '../data-query-keys';
import { endpoints } from '../endpoints';
import httpClient from '../httpClient';

export const useGetUserDetails = () => {
  return useQuery<UserListAPIResponse[], Error>({
    queryKey: [DataQueryKeys.USER_LIST],
    queryFn: async () => {
      const { data } = await httpClient.get(endpoints.getUserList());
      return data;
    },
  });
};
