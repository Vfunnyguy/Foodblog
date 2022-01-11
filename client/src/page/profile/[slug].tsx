import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IParams,RootStore } from '../../utils/Type'
import UserInfo from '../../components/profile/UserInfo'
import OtherInfo from '../../components/profile/OrtherInfo'
import UserBlog from '../../components/profile/UserBlog'




const Profile = () => {
const {slug}:IParams=useParams()
const {authReducer}=useSelector((state:RootStore)=>state)
    return (
        <div className='Profile-page'>
         <div className="info-user">
          {authReducer.user?._id===slug?<UserInfo/>:<OtherInfo id={slug}/>}    
         </div>
         <div className="user-blog-info">
             <UserBlog/>
         </div>

        </div>
    )
}

export default Profile
