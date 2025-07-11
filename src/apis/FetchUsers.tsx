import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { User } from '../types/user';

const fetchPosts = async (): Promise<User[]> => {
  const response = await axios.get<User[]>(
    'USERS',
  );
  return response.data;
};

export const useUsers = () =>
  useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: fetchPosts,
  });
