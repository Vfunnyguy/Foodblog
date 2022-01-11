import React from 'react'
import { Link } from 'react-router-dom'

import { IBlog} from '../../utils/Type'


interface IProps {
  blog: IBlog
}

const CardPreview: React.VFC<IProps> = ({blog}) => {

  return (
    <div className="card_preview" >
      <div className="main_preview_content">
        <div className="cpreview_img" style={{
          minHeight: '150px', maxHeight: '170px', overflow: 'hidden'
        }}>
          {
            blog.thumbnail && 
            <>
              {
                typeof(blog.thumbnail) === 'string'
                ? <Link to={`/blog/${blog._id}`}>
                    <img src={blog.thumbnail} 
                    className="thumb_img" 
                    alt="thumbnail" style={{objectFit: 'cover'}} />
                </Link>
                :<img src={URL.createObjectURL(blog.thumbnail)} 
                className="thumb_img" 
                alt="thumbnail" style={{objectFit: 'cover'}} />
              }
            </>
          }
          
        </div>
        
        <div className="preview_left_column">
          <div className="card_body">
            <p className="card_title">{blog.title}</p>
            <p className="card_text">{blog.description}</p>
            <p className="card_text">
              <small className="text-muted">
                {new Date(blog.createdAt).toLocaleString()}
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardPreview