import { Header } from '../components/Header';
import EditUserForm from '../components/EditUserFrom';

export const Home = () => (
  <>
    <Header />
    <EditUserForm user={{
      id: 0,
      user: '',
      name: '',
      email: '',
      gender: '',
      status: ''
    }} onSuccess={function (): void {
      throw new Error('Function not implemented.');
    } } />
  </>
);
