import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IntroPage from './pages/IntroPage';
import MainPage from './pages/MainPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/intro" element={<IntroPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
