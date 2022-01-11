import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootStore } from '../utils/Type'
import CardContent from '../components/card/cardContent'
import Loading from '../components/global/Loading'

const Home = () => {
const {blogsReducer}=useSelector((state:RootStore)=>state)
if(blogsReducer.length===0)return <Loading/>;
    return (
       
        <div className="home_page">
      {
        blogsReducer.map(homeBlog => (
          <div key={homeBlog._id} className='home_blog_content'>
            {
              homeBlog.count > 0 &&
              <>
                <h3>
                  <Link to={ `/blog/${(homeBlog.name).toLowerCase()}` } className='link_blog'>
                    { homeBlog.name } <small>({ homeBlog.count })</small>
                  </Link>
                </h3>
                

                <div className="home_blogs">
                  {
                    homeBlog.blogs.map(blog => (
                      <CardContent key={blog._id} blog={blog} />
                    ))
                  }
                </div>
              </>
            }

            {
              homeBlog.count > 4 && 
              <Link className="readmore"
              to={`/blog/${homeBlog.name}`}>
                Đọc Thêm &gt;&gt;
              </Link>
            }
          </div>
        ))
      }
    </div>
       
    )
}

export default Home
