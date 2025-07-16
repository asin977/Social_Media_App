import { Header } from '../components/Header';
import EditUserForm from '../components/EditUserFrom';
import { useGetUserDetails } from '../apis/user';

export const Home = () => {
  const { data: users, isLoading, isError, error } = useGetUserDetails();

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <>
      <Header />
      <EditUserForm users={users || []} />
    </>
  );
};
