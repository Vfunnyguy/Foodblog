import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom'
import { IBlog, RootStore, IUser, IComment, IParams } from '../../utils/Type'
import { createComment, getComment } from '../../redux/action/commentAction'
import Input from '../comment/inputCM'
import Comment from '../comment/Comment'
import Loading from '../global/Loading'
import Pagination from '../global/Pagination'
interface IProps {
    blog: IBlog
}
const DisplayBlog: React.VFC<IProps> = ({ blog }) => {
    const { authReducer, commentReducer } = useSelector((state: RootStore) => state)
    const dispatch = useDispatch()
    const [showCM, setShowCM] = useState<IComment[]>([])
    const [loading, setLoading] = useState(false)
    const { slug } = useParams<IParams>()
    const history = useHistory()
    const handleComment = (body: string) => {
        if (!authReducer || !authReducer.access_token) return;
        const data = {
            content: body,
            user: authReducer.user,
            blog_id: (blog._id as string),
            blog_user_id: (blog.user as IUser)._id,
            replyCM: [],
            createdAt: new Date().toISOString()
        }

        setShowCM([data, ...showCM])
        dispatch(createComment(data, authReducer.access_token))
    }
    useEffect(() => {
        setShowCM(commentReducer.data)

    }, [commentReducer.data])
    const layBinhluan = useCallback(async (id: string, num = 1) => {
        setLoading(true)
        await dispatch(getComment(id, num))
        setLoading(false)
    }, [dispatch])
    useEffect(() => {
        if (!blog._id) return
        const num = history.location.search.slice(6) || 1;
        layBinhluan(blog._id, num)

    }, [blog._id, layBinhluan, history])
    const handlePagination = (num: number) => {
        if (!blog._id) return
        layBinhluan(blog._id, num)

    }
    return (
        <div className='display_page'>
            <h2 className='text-center text-capitalize' style={{ color: '#ff7a00' }}>
                {blog.title}
            </h2>
            <div className="detail_body">
                <div className="info_title">
                    <h4>
                        {
                            typeof (blog.user) !== 'string' &&
                            <Link to={`/profile/${blog.user._id}`} className='author_link'>
                                <img src={blog.user.avatar} alt="" className='author_img' /> <span style={{ color: '#137ac9', fontSize: '18px', padding: '10px' }}>{blog.user.name}</span>
                            </Link>

                        }
                    </h4>

                    <h4 style={{ color: 'teal' }}>
                        <i className='fas fa-clock'></i>   {new Date(blog.createdAt).toLocaleString()}
                    </h4>

                </div>
                <section className="auth_edit">
                    {
                        (slug && (blog.user as IUser)._id === authReducer.user?._id) &&
                        <div className="edit_del_area" style={{}}>

                            <p className="update_link">
                                <Link to={`/update_blog/${blog._id}`} style={{ color: 'white' }}>
                                    Chỉnh sửa
                                    <i className="fas fa-edit p-2" style={{ color: 'white' }} />
                                </Link>

                            </p>
                        </div>

                    }

                </section>
                <hr />

                <div className="detail_info">
                    <div dangerouslySetInnerHTML={{
                        __html: blog.content
                    }} />
                    <hr />
                    <h3 style={{ fontSize: '25px', color: "#39bda7" }} className='text-center'>Bình Luận</h3>
                    <div className="comment-area">


                        {
                            authReducer.user ? <Input callback={handleComment} /> : <h4>Bạn phải <Link to={`/login?blogs/${blog._id}`} className='cm_log'>Đăng nhập</Link> để bình luận</h4>
                        }
                        {loading
                            ? <Loading />
                            : showCM?.map((comment, index) => (
                                <Comment key={index} comment={comment} />
                            ))
                        }
                        <div className="phan">


                            {

                                commentReducer.total > 1 &&
                                <Pagination
                                    total={commentReducer.total}
                                    callback={handlePagination}
                                />

                            }



                        </div>



                    </div>

                </div>
            </div>
        </div>
    )
}

export default DisplayBlog
