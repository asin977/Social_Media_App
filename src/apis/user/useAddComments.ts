import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import httpClient from '../httpClients';
import { endpoints } from '../endPoints';

export interface AddCommentPayload {
  postId: number;
  name: string;
  email: string;
  body: string;
}

export const useAddComments = () => {
  return useMutation({
    mutationFn: async (data: AddCommentPayload) => {
      const response = await httpClient.post(endpoints. addCommentToPost(data.postId), data);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Comment added successfully!');
    },
    onError: () => {
      toast.error('Failed to add comment.');
    },
  });
};






