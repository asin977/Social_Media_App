import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Home } from './pages';
import { routes } from './routes';

import './App.css';

const queryClient = new QueryClient();

const App = () => {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <ToastContainer position="top-right" autoClose={3000} />
        <BrowserRouter>
          <Routes>
            <Route path={routes.home} element={<Home />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
};

export default App;
