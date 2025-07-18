import { useQuery } from '@tanstack/react-query';

import { DataQueryKeys } from '../data-query-keys';
import { endpoints } from '../endpoints';
import httpClient from '../httpClient';

export type User = {
  id: number;
  name: string;
};

export const useFetchUsers = () => {
  return useQuery<User[]>({
    queryKey: [DataQueryKeys.USER_LIST],
    queryFn: () => httpClient.get(endpoints.getUserList()).then(res => res.data),
    staleTime: 0,
  });
};
