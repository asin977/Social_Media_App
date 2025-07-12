import { Header } from '../components/Header';
import UserList from '../components/UsersList';

export const Home = () => (
  <>
    <Header />
    <UserList initialName={''} onSave={function (newName: string): void {
      throw new Error('Function not implemented.');
    } } onDelete={function (): void {
      throw new Error('Function not implemented.');
    } } user={{
      id: 0,
      user: '',
      name: '',
      email: '',
      gender: '',
      status: ''
    }} />
  </>
);
