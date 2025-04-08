import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/main/MainPage';
import PostDetailPage from "./pages/post/detail/PostDetailPage";
import PostWritePage from "./pages/post/write/PostWritePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/write" element={<PostWritePage />} />
        <Route path="/posts/:id" element={<PostDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
