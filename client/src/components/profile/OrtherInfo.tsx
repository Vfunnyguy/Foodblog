import React,{useState,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {RootStore,IUser}from '../../utils/Type'
import { getOtherInfo } from '../../redux/action/profileAction'
import Loading from '../global/Loading'
interface IProps{
    id:string
}
const OtherInfo:React.VFC<IProps> = ({id}) => {
    const [other,setOther]=useState<IUser>()
    const {otherInfoReducer}=useSelector((state:RootStore)=>state)
    const dispatch=useDispatch()
    useEffect(()=>{
        if(!id)return
        if(otherInfoReducer.every(user=>user._id!==id)){
            dispatch(getOtherInfo(id))
        }else{
            const newUser=otherInfoReducer.find(user=>user._id===id)
            if(newUser)setOther(newUser)
        }

    },[id,otherInfoReducer,dispatch])
    if(!other)return<Loading/>
    return (
        <div className="profile_info">
        <div className="info_img">
          <img src={other.avatar} alt="avatar" />
        </div>
  
        <h5 className="text_role">
          {other.role}
        </h5>
  
        <div className="text_info">
          Tên: <span style={{color:'#3ed1d1'}}>
            {other.name}
          </span>
        </div>
  
        <div className="text_info">Email: 
        <span style={{color:"#4ec9a4"}} >
          {other.account}
        </span>
       </div>
        <div className="text_info">
          Ngày Tham Gia: <span style={{color: '#ffc107'}}>
            { new Date(other.createdAt).toLocaleString() }
          </span>
        </div>
      </div>
    )
}

export default OtherInfo
