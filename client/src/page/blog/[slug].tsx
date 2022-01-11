import React, { useState, useEffect } from 'react'
import { useParams ,useHistory,useLocation} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootStore, IParams, IBlog } from '../../utils/Type'
import { getBlogsByCategoryId } from '../../redux/action/blogAction'
import CardContent from '../../components/card/cardContent'
import Loading from '../../components/global/Loading'
import Pagination from '../../components/global/Pagination'

const BlogByCategory = () => {
  const { categoryReducer, blogsCategoryReducer } = useSelector((state: RootStore) => state)
  const dispatch = useDispatch()
  const { slug }: IParams = useParams()
  const [categoryId, setCategoryId] = useState('')
  const [blog, setBlogs] = useState<IBlog[]>()
  const [total, setTotal] = useState(0)
  const history=useHistory()
  const {search}=useLocation()
  
  useEffect(() => {
    const category = categoryReducer.find(item => item.name === slug)
    if (category) setCategoryId(category._id)
  }, [slug, categoryReducer])
  useEffect(() => {
    if (!categoryId) return;

    if (blogsCategoryReducer.every(item => item.id !== categoryId)) {
      dispatch(getBlogsByCategoryId(categoryId,search))
    } else {
      const data = blogsCategoryReducer.find(item => item.id === categoryId)
      if (!data) return;
      setBlogs(data.blogs)
      setTotal(data.total)
      if(data.search)history.push(data.search)
    }
  }, [categoryId, blogsCategoryReducer, dispatch,search,history])
  const handlePagination = (num: number) => {
    const search = `?page=${num}`
    dispatch(getBlogsByCategoryId(categoryId, search))
  }
  if (!blog) return < Loading />;
  return (
    <div className='categoryBlog_page'>
      <div className="blogs_category">
        <div className="slug_title">
        {slug.toUpperCase()}
        </div>
        <div className="show_blogs">
          {
            blog.map(blog => (
              
              < CardContent key={blog._id} blog={blog} />
            ))
          }
        </div>
      </div>
      <div className="phantrang">
         
      {
        total > 1 &&
        <Pagination 
        total={total}
        callback={handlePagination}
        />
      }
      </div>
    </div>
  )
}

export default BlogByCategory
