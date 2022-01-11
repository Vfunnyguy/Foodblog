import React, { useState, useEffect } from 'react'
import { getAPI } from '../../utils/Fetch'
import { IBlog } from '../../utils/Type'
import { useLocation } from 'react-router-dom'
import CardVert from '../card/CardVert'
const Searchbar = () => {
    const [search, setSearch] = useState('')
    const [blogs,setBlogs]=useState<IBlog[]>([])
    const pname=useLocation()
    useEffect(() => {
        const delay=setTimeout(async()=>{

            if (search.length<2) return setBlogs([]);
            try {
                const res=await getAPI(`search/blog?title=${search}`)
                setBlogs(res.data)                
            } catch (error:any) {
                console.log(error)
            }
        },400)
        return()=>clearTimeout(delay)
    }, [search])
    useEffect(()=>{
        setSearch('')
        setBlogs([])
    },[pname])
    return (
        <div className='search-box'>
            <input type="search" className='search-inp' value={search} placeholder='Tìm Kiếm...' onChange={e => setSearch(e.target.value)} />
            <span className='bottom'></span>
            <section className="search_body">
                {
                    search.length>=2&&
                    <div className="search_result">
                        {
                            blogs.length 
                            ? blogs.map(blog=>(
                                <CardVert key={blog._id} blog={blog}  />
                            ))
                            : <h3 className='text-center'>Không tìm thấy bài viết!</h3>
                        }
                    </div>
                }
            </section>


        </div>
    )
}

export default Searchbar