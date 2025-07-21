import { ToastContainer, toast } from 'react-toastify';

import { Header } from '../components/Header';
import UserListItem from '../components/UserListItem';

export const Home = () => (
  <>
    <Header />
    <UserListItem />
    <ToastContainer />
  </>
);
