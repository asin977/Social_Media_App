import { useMutation, useQueryClient } from '@tanstack/react-query';

import { DataQueryKeys } from '../data-query-keys';
import { endpoints } from '../endpoints';
import httpClient from '../httpClient';

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (userId: number) => {
      const response = await httpClient.delete<void>(
        endpoints.deleteUser(userId.toString()),
      );

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DataQueryKeys.USER_LIST] });
    },
  });
};
