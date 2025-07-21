import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

import { Header } from '../components/Header';
import CommentList from '../components/CommentList';

export const Home = () => (
  <>
    <Header />
    <CommentList postId={0} />
    <ToastContainer />
  </>
);
