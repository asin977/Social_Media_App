import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { routes } from './routes';
import { Home } from './pages';
import Main from './pages/Main'

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Main />} />
          <Route path={routes.home} element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
