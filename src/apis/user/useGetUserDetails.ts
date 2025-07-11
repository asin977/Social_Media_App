import { useQuery } from '@tanstack/react-query';

import { data } from 'react-router-dom';
import { fetchUsers } from '../FetchUsers';
import { DataStorageKeys } from '../data-query-keys';

export const useGetUserDetails = () => {
  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [DataStorageKeys.USER],
    queryFn: fetchUsers,
  });

  return { data, users, isLoading, isError, error };
};
