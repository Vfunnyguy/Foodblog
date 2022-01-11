import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useParams,useHistory } from 'react-router-dom'
import {RootStore,IParams,IBlog} from '../../utils/Type'
import { getBlogByUserID } from '../../redux/action/blogAction'
import Loading from '../global/Loading'
import Pagination from '../global/Pagination'
import CardVert from '../card/CardVert'

const UserBlog = () => {
  const {blogsUserReducer}=useSelector((state:RootStore)=>state)
  const dispatch=useDispatch()
  const user_id = useParams<IParams>().slug
  const [blog,setBlog]=useState<IBlog[]>()
  const [total, setTotal] = useState(0)
  const history = useHistory()
  const { search } = history.location
  useEffect(()=>{
    if(!user_id)return
    if(blogsUserReducer.every(item => item.id !== user_id)){
        dispatch(getBlogByUserID(user_id, search))
      }else{
        const data = blogsUserReducer.find(item => item.id === user_id)
        if(!data) return;
        setBlog(data.blogs)
        setTotal(data.total)
        if(data.search) history.push(data.search)
      }

    },[user_id,blogsUserReducer,dispatch,search,history])
    const handlePagination = (num: number) => {
        const search = `?page=${num}`
        dispatch(getBlogByUserID(user_id, search))
      }
      if(!blog) return <Loading />;

      if(blog.length === 0 && total<1) return(
        <h1 className="text-center">Không có bài viết nào!</h1>
      )
    return (
        <div>
        <div>
          {
            blog.map(blog => (
              <CardVert key={blog._id} blog={blog} />
            ))
          }
        </div>
        <div>
            <Pagination 
            total={total}
            callback={handlePagination}
            />
        </div>
        </div>
    )
}

export default UserBlog
