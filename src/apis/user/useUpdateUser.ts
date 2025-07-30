import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UpdateUserPayLoad, UserListAPIResponse } from '../../types/user';
import { DataQueryKeys } from '../data-query-keys';
import { endpoints } from '../endpoints';
import httpClient from '../httpClient';

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<UserListAPIResponse, Error, UpdateUserPayLoad>({
    mutationFn: async (payload: UpdateUserPayLoad) => {
      const { id, ...dataToUpdate } = payload;
      const response = await httpClient.put<UserListAPIResponse>(
        endpoints.updateUserDetails(id.toString()),
        dataToUpdate,
      );

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DataQueryKeys.USER_LIST] });
    },
  });
};
