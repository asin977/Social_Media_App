import { useQuery } from '@tanstack/react-query';

import { DataQueryKeys } from '../data-query-keys';
import httpClient from '../httpClients';
import { endpoints } from '../endPoints';
import { AddCommentPayload } from '../../types/comments';

export const useGetComments = () => {
  return useQuery<AddCommentPayload[]>({
    queryKey: [DataQueryKeys.COMMENT_LIST],
    queryFn: async () => {
      const { data } = await httpClient.get(endpoints.getComments());
      return data;
    },
  });
};
