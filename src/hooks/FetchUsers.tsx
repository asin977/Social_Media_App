import { useQuery } from '@tanstack/react-query';
import { User } from '../types/user';

const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch('https://gorest.co.in/public/v2/users'); 
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
};

const UserList = () => {
  const { data, isLoading, isError, error } = useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error: {error.message}</p>;
}