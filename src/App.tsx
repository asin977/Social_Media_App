import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';

import { routes } from './routes';
import { UsersPost } from './pages';

import './App.css';

const queryClient = new QueryClient();

const App = () => {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path={routes.userspost} element={<UsersPost />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
};

export default App;
