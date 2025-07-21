import { useQuery } from '@tanstack/react-query';

import { DataQueryKeys } from '../data-query-keys';
import httpClient from '../httpClient';
import { endpoints } from '../endpoints';
import { AddCommentPayload } from '../../types/posts';

export const useGetCommentList = (postId: number) => {
  return useQuery<AddCommentPayload[]>({
    queryKey: [DataQueryKeys.COMMENT_LIST],
    queryFn: async () => {
      const { data } = await httpClient.get(endpoints.getComments());
      return data;
    },
  });
};
