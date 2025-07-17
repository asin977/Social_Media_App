import { useQueryClient, useMutation } from '@tanstack/react-query';

import { DataQueryKeys } from '../data-query-keys';
import { useUpdateUserList } from './useUpdateUserList';

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: useUpdateUserList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DataQueryKeys.USER_LIST] });
      alert('User name changed successfully!');
    },
    onError: (error: any) => {
      alert('Failed to update user.');
    },
  });

  return mutation;
};
