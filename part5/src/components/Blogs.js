import { useRef } from "react";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";

const Blogs = ({
  blogs,
  setBlogs,
  user,
  setUser,
  sendNotification,
  handleLike,
  handleRemove,
}) => {
  const blogFormRef = useRef();
  return (
    <div>
      <p>
        {user.name} logged-in
        <button
          onClick={() => {
            window.localStorage.removeItem("loggedBlogappUser");
            setUser(null);
          }}
        >
          logout
        </button>
      </p>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm
          blogs={blogs}
          setBlogs={setBlogs}
          sendNotification={sendNotification}
          toggleVisibility={() => blogFormRef.current.toggleVisibility()}
        />
      </Togglable>
      <ul>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
            handleRemove={handleRemove}
            user={user}
          />
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
