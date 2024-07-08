import { Routes, Route } from "react-router-dom";

import HomePage from "./screens/home/HomePage";
import ArticleDetail from "./screens/articleDetail/ArticleDetail";
import RegisterPage from "./screens/register/RegisterPage";
import { Toaster } from "react-hot-toast";
import LoginPage from "./screens/login/LoginPage";
import ProfilePage from "./screens/profile/ProfilePage";
import AdminLayout from "./screens/admin/AdminLayout";

import Comments from "./screens/admin/screens/comments/Comments";
import Admin from "./screens/admin/screens/Admin";
import NewPost from "./screens/admin/screens/posts/NewPost";
import ManagePosts from "./screens/admin/screens/posts/ManagePosts";

export default function App() {
  return (
    <div className="font-opensans  ">
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/blog/:slug" element={<ArticleDetail />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Admin />} />
          <Route path={"comments"} element={<Comments />} />
          <Route path={"posts/new"} element={<NewPost />} />
          <Route path={"posts/manage"} element={<ManagePosts />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}
