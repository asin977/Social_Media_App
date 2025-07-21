import { useQueryClient, useMutation } from '@tanstack/react-query';
import { DataQueryKeys } from '../data-query-keys';
import { UpdateUserPayLoad, UserListAPIResponse } from '../../types/user';
import { endpoints } from '../endpoints'; //
import httpClient from '../httpClient';

export const useUpdateUser = (options?: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation<UserListAPIResponse, Error, UpdateUserPayLoad>({
    mutationFn: async (payload: UpdateUserPayLoad) => {
      const { id, ...dataToUpdate } = payload;
      const response = await httpClient.put<UserListAPIResponse>(
        endpoints.getUserDetails(String(id)),
        dataToUpdate,
      );

      if (!response.status) {
        throw new Error('Failed to update user.');
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DataQueryKeys.USER_LIST] });
      options?.onSuccess?.();
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
