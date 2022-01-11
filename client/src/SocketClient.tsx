import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { RootStore,IComment } from './utils/Type'
import {CREATE_COMMENT,REPLY_COMMENT,UPDATE_COMMENT,UPDATE_REPLY,DELETE_COMMENT,DELETE_REPLY}from './redux/types/commentType'
const SocketClient = () => {
    const {socketReducer}=useSelector((state:RootStore)=>state)
    const dispatch=useDispatch()
    //tao comment
    useEffect(()=>{
        if(!socketReducer)return
        socketReducer.on('createComment',(data:IComment)=>{
            dispatch({
                type:CREATE_COMMENT,
                payload:data
            })
        })
        return ()=>{socketReducer.off('createComment')}

    },[socketReducer,dispatch])
    //reply
    useEffect(()=>{
        if(!socketReducer)return
        socketReducer.on('replyComment',(data:IComment)=>{
            dispatch({
               type: REPLY_COMMENT,
               payload:data
             });
        })
        return ()=>{socketReducer.off('replyComment')}

    },[socketReducer,dispatch])
    //update
    useEffect(()=>{
        if(!socketReducer)return
        socketReducer.on('updateComment',(data:IComment)=>{
            dispatch({
                type: data.comment_root ? UPDATE_REPLY : UPDATE_COMMENT,
                payload: data,
              });
        })
        return ()=>{socketReducer.off('updateComment')}

    },[socketReducer,dispatch])
    //delete
    useEffect(()=>{
        if(!socketReducer)return
        socketReducer.on('deleteComment',(data:IComment)=>{
            dispatch({
                type: data.comment_root ? DELETE_REPLY : DELETE_COMMENT,
                payload: data,
              });
        })
        return ()=>{socketReducer.off('deleteComment')}

    },[socketReducer,dispatch])

    return (
        <div>
            
        </div>
    )
}

export default SocketClient
