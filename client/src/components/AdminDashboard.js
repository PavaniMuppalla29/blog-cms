import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [authors, setAuthors] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const [userRes, blogRes] = await Promise.all([
        axios.get("http://localhost:4000/api/users", { headers }),
        axios.get("http://localhost:4000/api/blog", { headers }),
      ]);

      const allUsers = userRes.data;
      setUsers(allUsers.filter((u) => u.role === "user"));
      setAuthors(allUsers.filter((u) => u.role === "author"));
      setBlogs(blogRes.data);
    } catch (err) {
      setMsg("Failed to load admin data.");
    }
  };

  const toggleBlockUser = async (id, currentStatus) => {
    try {
      await axios.put(
        `http://localhost:4000/api/${
          currentStatus ? "unblock-user" : "block-user"
        }/${id}`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMsg("User status updated.");
      fetchAllData();
    } catch (err) {
      setMsg("Failed to update user status.");
    }
  };

  const toggleBlockBlog = async (articleId, currentStatus) => {
    try {
      await axios.put(
        `http://localhost:4000/api/${
          currentStatus ? "unblock-blog" : "block-blog"
        }/${articleId}`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMsg("Blog status updated.");
      fetchAllData();
    } catch (err) {
      setMsg("Failed to update blog status.");
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>🛡️ Admin Dashboard</h2>
      {msg && <p className="msg">{msg}</p>}

      <section>
        <h3>👩‍💻 Authors</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Control</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((a) => (
              <tr key={a._id}>
                <td>{a.name}</td>
                <td>{a.email}</td>
                <td>{a.isBlocked ? "Blocked" : "Active"}</td>
                <td>
                  <button onClick={() => toggleBlockUser(a._id, a.isBlocked)}>
                    {a.isBlocked ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h3>📝 Blogs</h3>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Status</th>
              <th>Control</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((b) => (
              <tr key={b._id}>
                <td>{b.title}</td>
                <td>{b.authorData.name}</td>
                <td>{b.category}</td>
                <td>{b.isBlocked ? "Blocked" : "Active"}</td>
                <td>
                  <button
                    onClick={() => toggleBlockBlog(b.articleId, b.isBlocked)}
                  >
                    {b.isBlocked ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h3>👥 Users</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Control</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{u.isBlocked ? "Blocked" : "Active"}</td>
                <td>
                  <button onClick={() => toggleBlockUser(u._id, u.isBlocked)}>
                    {u.isBlocked ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminDashboard;
