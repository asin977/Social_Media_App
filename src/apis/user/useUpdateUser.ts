import { useQueryClient, useMutation } from '@tanstack/react-query';
import { DataQueryKeys } from '../data-query-keys';
import { useUpdateUserList } from './useUpdateUserList';

export const useUpdateUser = (options?: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: useUpdateUserList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DataQueryKeys.USER_LIST] });
      options?.onSuccess?.();
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
};