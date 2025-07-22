import { useQuery } from '@tanstack/react-query';

<<<<<<< HEAD
import { UserListAPIResponse } from '../../types/user';
import { DataQueryKeys } from '../data-query-keys';
import { endpoints } from '../endpoints';
import httpClient from '../httpClient';

export const useGetUserList = () => {
  return useQuery<UserListAPIResponse[], Error>({
    queryKey: [DataQueryKeys.USER_LIST],
=======
import { DataStorageKeys } from '../data-query-keys';
import httpClient from '../httpClient';
import { endpoints } from '../endpoints';
import { UserListAPIResponse } from '../../types/user';

export const useGetUserList = () => {
  return useQuery<UserListAPIResponse[]>({
    queryKey: [DataStorageKeys.USER_LIST],
>>>>>>> main
    queryFn: async () => {
      const { data } = await httpClient.get(endpoints.getUserList());
      return data;
    },
  });
};
