import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IBlog, IParams,RootStore } from '../../utils/Type'
import { getAPI } from '../../utils/Fetch'
import Loading from '../../components/global/Loading'
import { showErr } from '../../components/alert/Alert'
import DisplayBlog from '../../components/blog/displayBlog'
const DetailBlog = () => {
const id=useParams<IParams> ().slug
const {socketReducer}=useSelector((state:RootStore)=>state)
const [blog,setBlog]=useState<IBlog>()
const [loading,setLoading]=useState(false)
const [err,setErr]=useState('')
useEffect(()=>{
if(!id)return;
setLoading(true)
getAPI(`getBlog/${id}`).then(res=>{
    console.log(res)
    setBlog(res.data)
    setLoading(false)
}).catch(err=>{
    console.log(err)
    setErr(err.response.data.msg)
    setLoading(false)
})
return ()=>setBlog(undefined)
},[id])
useEffect(()=>{
    if(!id || !socketReducer)return;
    socketReducer.emit('joinRoom',id)
    return()=>{
    socketReducer.emit('outRoom',id)
    }
},[socketReducer,id])
if(loading)return<Loading/>
    return (
        <div className='detail_page'>
            {err&&showErr(err)}
            {blog &&<DisplayBlog blog={blog}/>}

        </div>
    )
}

export default DetailBlog
