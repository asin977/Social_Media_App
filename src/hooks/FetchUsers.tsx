import { useQuery } from '@tanstack/react-query';
import { User } from '../types/user';

export const useUsers = (url: string) => {
  return useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch users');
      return res.json();
    },
  });
};
