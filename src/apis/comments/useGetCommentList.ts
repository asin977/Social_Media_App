import { useQuery } from '@tanstack/react-query';

import { CommentResponse } from '../../types/comments';
import { DataQueryKeys } from '../data-query-keys';
import { endpoints } from '../endPoints';
import httpClient from '../httpClients';

export const useGetCommentList = () => {
  return useQuery<CommentResponse[]>({
    queryKey: [DataQueryKeys.COMMENT_LIST],
    queryFn: async () => {
      const { data } = await httpClient.get(endpoints.getComments());
      
      return data;
    },
  });
};
