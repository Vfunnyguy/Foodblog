import React, { useState, useRef,useEffect } from 'react'
import { IComment } from '../../utils/Type'
import EditCm from '../edit/editCm'
// import Quill from '../edit/Quill'
interface IProps {
    callback: (body: string) => void
    edit?:IComment
    setEdit?:(edit?:IComment)=>void

}
const InputCM: React.VFC<IProps> = ({ callback,edit,setEdit }) => {
    const [body, setBody] = useState('')
    const divRef = useRef<HTMLDivElement>(null)
    useEffect(()=>{
        if(edit)setBody(edit.content)

    },[edit])
    const handleSubmit = () => {
        const div = divRef.current
        const txt = (div?.innerText as string)
        if (!txt.trim())  {
            if(setEdit) return setEdit(undefined);
            return;
          };
        callback(body)
        setBody('')
    }
    return (
        <div className='input_comment_area'>
            <EditCm body={body} setBody={setBody} />
            <div ref={divRef} dangerouslySetInnerHTML={{
                __html: body
            }
            } style={{ display: 'none' }} />
            <button className='btn_comment' onClick={handleSubmit}>
                <div className="svg-wrapper-1">
                    <div className="svg-wrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
                        </svg>
                    </div>
                </div>
                <span>{edit?'Update':'Send'}</span>
            </button>
            <input type="submit" style={{display:'none'}}/>
        </div>
    )
}

export default InputCM
