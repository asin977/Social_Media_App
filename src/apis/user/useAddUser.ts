import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UserListAPIResponse } from '../../types/user';
import { DataQueryKeys } from '../data-query-keys';
import { endpoints } from '../endpoints';
import httpClient from '../httpClient';

const addUserRequest = async (payload: Partial<UserListAPIResponse>) => {
  const response = await httpClient.post(endpoints.createUser(), payload);
  return response.data;
};

export const useAddUser = ({}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addUserRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DataQueryKeys.USER_LIST] });
    },
  });
};
