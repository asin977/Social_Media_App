import { useMutation } from '@tanstack/react-query';
import httpClient from '../httpClients';
import { endpoints } from '../endPoints';
import { AddCommentPayload } from '../../types/comments';

export const useAddComments = () => {
  return useMutation({
    mutationFn: async (payload: AddCommentPayload) => {
      const { postId, ...rest } = payload;
      const { data } = await httpClient.post(
        endpoints.createPostComment(postId),
        rest
      );
      return data;
    },
  });
};
