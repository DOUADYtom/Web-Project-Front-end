import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import MonumentPage from './features/monument/MonumentPage';
import RegisterPage from './components/RegisterPage';
import MyPage from './features/user/MyPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<MainPage/>}/>
        <Route path="/monument" element={<MonumentPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/forgot_password" element={<p>RIP</p>}/>
        <Route path="/search" element={<p>Search</p>}/>
        <Route path="/mypage" element={<MyPage/>}/>
      </Route>
    </Routes>
  );
};

export default App;
