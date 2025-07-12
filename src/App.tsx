import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { routes } from './routes';
import { Home } from './pages';
import { PostPage } from './pages';

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.post} element={<PostPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
