import React ,{useState,useEffect}from 'react'
import { useParams } from 'react-router-dom'
import { IParams } from '../../utils/Type'
import { postAPI } from '../../utils/Fetch'
import {showErr,showSuccess}from '../../components/alert/Alert'
import { error } from 'console'
const Active = () => {
    const { slug }:IParams=useParams()
    const [err,setErr]=useState('')
    const [success,setSuccess]=useState('')
    useEffect(()=>{
      if(slug){
          postAPI('active',{active_token:slug})
          .then(res=> setSuccess(res.data.msg))
          .catch(error=>setErr(error.response.data.msg))
          
      }
    },[slug])
    return (
        <div className='active_page'>
              { err && showErr(err) }
              { success && showSuccess(success) }
        </div>
    )
}

export default Active