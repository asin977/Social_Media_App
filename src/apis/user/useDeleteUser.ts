import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { DataQueryKeys } from '../data-query-keys';
import { endpoints } from '../endpoints';
import httpClient from '../httpClient';

const deleteUserRequest = async (userId: string) => {
  const response = await httpClient.delete<void>(endpoints.getUserList());
  return response.data;
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: deleteUserRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DataQueryKeys.USER_LIST] });
      // console.log('User deleted Successfully!..');
      
    },
    // catch (error) {
    //   toast.error(`Error:${error.message}`)
    }
  });
};
