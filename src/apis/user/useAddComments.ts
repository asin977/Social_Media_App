import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import httpClient from '../httpClients';
import { endpoints } from '../endPoints';
import { AddCommentPayload, CommentResponse } from '../../types/comments';

export const useAddComments = () => {
  return useMutation<CommentResponse, Error, AddCommentPayload>({
    mutationFn: async (data) => {
      try {
        const payload = {
          post: data.postId,  
          name: data.name,
          email: data.email,
          body: data.body,
        };

        const response = await httpClient.post(
          endpoints.addCommentToPost(data.postId),
          payload
        );
        return response.data;
      } catch (error: any) {
        console.error('Add comment failed:', error.response?.data || error.message);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success('Comment added successfully!');
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || error.message || 'Failed to add comment.';
      toast.error(msg);
    },
  });
};
