import { useQuery } from '@tanstack/react-query';
import httpClient  from '../httpClient';
import { endpoints } from '../endpoints';

export type User = {
  id: number;
  name: string;
};

export const useFetchUsers = () => {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => httpClient.get(endpoints.getUserList()).then(res => res.data),
    staleTime: 0,
  });
};
