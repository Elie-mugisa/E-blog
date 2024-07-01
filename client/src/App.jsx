import { Routes, Route } from "react-router-dom";

import HomePage from "./screens/home/HomePage";
import ArticleDetail from "./screens/articleDetail/ArticleDetail";
import RegisterPage from "./screens/register/RegisterPage";
import { Toaster } from "react-hot-toast";
import LoginPage from "./screens/login/LoginPage";
import ProfilePage from "./screens/profile/ProfilePage";

export default function App() {
  return (
    <div className="font-opensans  ">
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/blog/:slug" element={<ArticleDetail />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <Toaster />
    </div>
  );
}
 