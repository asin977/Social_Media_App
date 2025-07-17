import { useQueryClient, useMutation } from '@tanstack/react-query';
import { DataQueryKeys } from '../data-query-keys';

import { UserListAPIResponse } from '../../types/user';
import { useUpdateUserList } from './useUpdateUserList';

type Props = {
  users: UserListAPIResponse[];
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const { mutate, isError, data, error } = useMutation({
    mutationFn: useUpdateUserList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DataQueryKeys.USER_LIST] });
      alert('User name changed successfully!');
    },
    onError: (error: any) => {
      console.error('Update error:', error.message);
      alert('Failed to upadate user..');
    },
  });
  return { mutate, isError, data, error };
};
