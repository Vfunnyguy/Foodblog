import React, { useState,useEffect } from 'react'
import { IComment } from '../../utils/Type'
import AvatarCm from './AvatarCm'
import CommentList from './CommentList'
import AvatarReply from './AvatarReply'
interface IProps {
  comment: IComment
}
const Comment: React.VFC<IProps> = ({ comment }) => {
  const [showReply, setShowReply] = useState<IComment[]>([])
  const [next,setNext]=useState(2)
  useEffect(() => {
    if(!comment.replyCM) return;
    setShowReply(comment.replyCM)
  },[comment.replyCM])

  return (
    <div className='comment_section' style={{
      opacity: comment._id ? 1 : 0.5,
      pointerEvents: comment._id ? 'initial' : 'none'
    }}>
      <AvatarCm user={comment.user} />

      <CommentList
        comment={comment}
        showReply={showReply}
        setShowReply={setShowReply}
      >
        {
          showReply.slice(0,next).map((comment, index) => (
            <div key={index} style={{
              opacity: comment._id ? 1 : 0.5,
              pointerEvents: comment._id ? 'initial' : 'none'
            }} className='reply_box'>
              <AvatarReply
                user={comment.user}
                reply_user={comment.reply_user}
              />

              <CommentList
                comment={comment}
                showReply={showReply}
                setShowReply={setShowReply} children={undefined} />
            </div>
          ))
        }
         <div style={{ cursor: 'pointer' }}>
          {
            showReply.length -next > 0
            ? <small style={{ color: 'crimson' }}
            onClick={() => setNext(next + 5)}>
              Xem thêm bình luận...
            </small>
            : showReply.length > 2 && 
            <small style={{ color: 'teal' }}
            onClick={() => setNext(2)}>
              Ản bớt...
            </small>
          }
        </div>

      </CommentList>


    </div>
  )
}

export default Comment
