import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IBlog, IParams,IUser, RootStore } from "../../utils/Type";
import {deleteBlog}from '../../redux/action/blogAction'
interface IProps {
  blog: IBlog;
}
const CardVert: React.VFC<IProps> = ({ blog }) => {
  const { slug } = useParams<IParams>()
  const { authReducer } = useSelector((state: RootStore) => state)
  const dispatch=useDispatch()
  const handleXoa=()=>{
    if(!authReducer.user||!authReducer.access_token)return;
    if(slug !== authReducer.user._id) return dispatch({
      type: 'ALERT',
      payload: { erros: 'Invalid Authentication.' }
    })
    if(window.confirm('Bạn có chắc muốn xóa bài viết này')){
      dispatch(deleteBlog(blog,authReducer.access_token))
    }
  }

  return (
    <div className="card_vert card_shadow">
      <div className="card_header card_img">
        {typeof blog.thumbnail === "string" && (
          <img src={blog.thumbnail} className="card_thumb" alt="thumbnail" />
        )}
      </div>
      <div className="card_body">
        <div className="blog_title">
          <Link to={`/blogs/${blog._id}`}>
            {blog.title.slice(0, 50).toUpperCase() + "..."}
          </Link>
        </div>
        <div className="blog_descr">
          {blog.description.slice(0, 100) + "..."}
        </div>
      </div>
      <div className="card_footer vert_footer">

        {
          (slug && (blog.user as IUser)._id === authReducer.user?._id) &&
          <div className="edit_del_area" style={{}}>

          <p className="update_link">
            <Link to={`/update_blog/${blog._id}`}style={{color:'white'}}>
              Chỉnh sửa
              <i className="fas fa-edit p-2" style={{color:'white'}}/>
            </Link>

          </p>
          <p className="del_link m-2"style={{color:'white'}} onClick={handleXoa}>
       
          Xóa
          <i className="fas fa-trash-alt p-2"style={{color:'white'}}/>
        </p>
          </div>

        }

       
      </div>
    </div>
  );
};

export default CardVert;
