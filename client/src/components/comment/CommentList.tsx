import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IComment, RootStore } from '../../utils/Type'
import { replyComment,updateComment,deleteComment } from '../../redux/action/commentAction'
import Input from './inputCM'
interface IProps {
  children: any
  comment: IComment
  showReply: IComment[]
  setShowReply: (showReply: IComment[]) => void

}
const CommentList: React.VFC<IProps> = ({ children, comment, showReply, setShowReply }) => {
  const [onRep, setOnrep] = useState(false)
  const { authReducer } = useSelector((state: RootStore) => state)
  const dispatch = useDispatch()
  const [edit, setEdit] = useState<IComment>()
  const handleRep = (body: string) => {
    if (!authReducer.user || !authReducer.access_token) return;

    const data = {
      user: authReducer.user,
      blog_id: comment.blog_id,
      blog_user_id: comment.blog_user_id,
      content: body,
      replyCM:[],
      reply_user: comment.user,
      comment_root: comment.comment_root || comment._id,
      createdAt: new Date().toISOString()
    }
    setShowReply([data, ...showReply])
    dispatch(replyComment(data, authReducer.access_token))
    setOnrep(false)

  }
  const handleUpdate = (body: string) => {
    if(!authReducer.user || !authReducer.access_token || !edit) return;

    if(body === edit.content) 
      return setEdit(undefined)
    
    const newComment = {...edit, content: body}
    dispatch(updateComment(newComment, authReducer.access_token))
    setEdit(undefined)
  }
  const handleDel=(comment:IComment)=>{
    if(!authReducer.user || !authReducer.access_token ) return;
    dispatch(deleteComment(comment, authReducer.access_token))


  }
  const Nav = (comment: IComment) => {
    return (
      <div className="nav_flex_cm">
        <i className='fas fa-trash-alt del_icon'
        onClick={()=>handleDel(comment)}
        />
        <i className='fas fa-edit me-2'
          onClick={() => setEdit(comment)}

        />
      </div>

    )
  }
  return (
    <div>
      <div className="comment_box">
        {
          edit
            ? <Input callback={handleUpdate} edit={edit}setEdit={setEdit}/>
            : <div className="inner-section">
              <div className="p-2" dangerouslySetInnerHTML={{ __html: comment.content }} />
              <div className="reply">
                <small style={{ cursor: 'pointer' }} onClick={() => setOnrep(!onRep)}>
                  {onRep ? '- Hủy -' : '- Trả lời -'}
                </small>
                <div className='edit_del_cm' style={{ cursor: 'pointer' }}>
                  {
                    comment.blog_user_id === authReducer.user?._id
                      ? comment.user._id === authReducer.user._id
                        ? Nav(comment)
                        : <i className='fas fa-trash-alt del_icon' 
                        onClick={() => handleDel(comment)}
                        />
                      : comment.user._id === authReducer.user?._id && Nav(comment)
                  }
                </div>
                <small>
                  {new Date(comment.createdAt).toLocaleString()}
                </small>
              </div>
            </div>
        }



        {
          onRep && <Input callback={handleRep} />
        }
        {children}

      </div>
    </div>

  )
}

export default CommentList
