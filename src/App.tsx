import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Home } from './pages';
import { routes } from './routes';

import './App.css';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path={routes.home} element={<Home />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
