import React from "react";
import { Link } from "react-router-dom";
import { IBlog } from "../../utils/Type";
interface IProps {
  blog: IBlog;
}
const CardContent: React.VFC<IProps> = ({ blog }) => {
  return (
    <div className="card_content card_shadow">
      <div className="card_header card_img">
        {typeof blog.thumbnail === "string" && (
          <img src={blog.thumbnail} className="card_thumb" alt="thumbnail" />
        )}
      </div>
      <div className="card_body">
        <div className="blog_title">
          <Link to={`/blogs/${blog._id}`}>
            {blog.title.slice(0, 20).toUpperCase() + "..."}
          </Link>
        </div>
        <div className="blog_descr">
          {blog.description.slice(0, 150) + "..."}
        </div>
      </div>
      <div className="card_footer">
        <p className="p_link">
          {typeof blog.user !== "string" && (
            <Link to={`/profile/${blog.user._id}`}>
              Tác Giả: {blog.user.name}
            </Link>
          )}
        </p>
      </div>
    </div>
  );
};

export default CardContent;
