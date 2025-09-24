import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import AuthorDashboard from "./components/AuthorDashboard";
import UserDashboard from "./components/UserDashboard";
import WriteBlog from "./components/WriteBlog";
import BlogDetail from "./components/BlogDetail";
import EditBlog from "./components/EditBlog";
import BlogBot from "./components/BlogBot";

function App() {
  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/admin-dashboard",
          element: <AdminDashboard />,
        },
        {
          path: "/author-dashboard",
          element: <AuthorDashboard />,
        },
        {
          path: "/user-dashboard",
          element: <UserDashboard />,
        },
        {
          path: "/write-blog",
          element: <WriteBlog />,
        },
        {
          path: "/blog/:id",
          element: <BlogDetail />,
        },
        {
          path: "/edit-blog/:id",
          element: <EditBlog />,
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={browserRouter} />
      <BlogBot />
    </div>
  );
}

export default App;
