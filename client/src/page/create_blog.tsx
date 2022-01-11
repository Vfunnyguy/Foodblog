import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootStore, IBlog ,IUser} from "../utils/Type";
import { validCreateBlog,shallowEqual } from "../utils/Valid";
import { ALERT } from '../redux/types/alertType';
import { createBlog,updateBlog } from "../redux/action/blogAction";
import { getAPI } from "../utils/Fetch";
import NotFound from "../components/global/notfound";
import CardPreview from "../components/card/cardPreview";
import CreateForm from "../components/card/createForm";
import EditBox from "../components/edit/editBox";
interface IProps {
  id?: string
}
const Createblog: React.VFC<IProps> = ({ id }) => {
  //data array
  const initState = {
    user: "",
    title: "",
    content: "",
    description: "",
    thumbnail: "",
    category: "",
    createdAt: new Date().toISOString(),
  };
  //state hook
  const [blog, setBlog] = useState<IBlog>(initState);
  const [body, setBody] = useState("");
  const divRef = useRef<HTMLDivElement>(null)
  const [text, setText] = useState('')
  const { authReducer } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();
  const [oldData,setOldData]=useState<IBlog>(initState)
  //effect hook
  useEffect(() => {
    if (!id) return;
    getAPI(`getBlog/${id}`).then(res => {
      setBlog(res.data)
      setBody(res.data.content)
      setOldData(res.data)
    }).catch(error => { console.log(error) })

    const initDuLieu={
      user:'',
      title:'',
      content:'',
      description:'',
      thumbnail:'',
      category:'',
      createdAt:new Date().toISOString()
    }
    return () => {
      setBlog(initDuLieu)
      setBody('')
      setOldData(initDuLieu)
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps 

  }, [id])
  useEffect(() => {
    const div = divRef.current;
    if (!div) return;
    const text = (div?.innerText as string)
    setText(text)
  }, [body])
  const handleSubmit = async () => {
    if (!authReducer.access_token) return;
    const check = validCreateBlog({ ...blog, content: text })
    console.log(check)
    if (check.errLength !== 0) {////window.alert(check.errMsg)
      return  dispatch({ type: ALERT, payload: { erros: check.errMsg } })
    }
    let newData = { ...blog, content: body }
    if (id) {
      if((blog.user as IUser)._id !== authReducer.user?._id)
        return dispatch({
          type: ALERT,
          payload: { errors: 'Invalid Authentication.' }
        })
      const ketqua=shallowEqual(oldData,newData)
      console.log(ketqua)
      if(ketqua)return dispatch({
        type:ALERT,
        payload:{erros:'Bài viết chưa được chỉnh sủa'}
      })
      dispatch(updateBlog(newData, authReducer.access_token))
    } else {
      dispatch(createBlog(newData, authReducer.access_token))
    }
  }

  if (!authReducer.access_token) return <NotFound />;
  return (
    <div className="blog_page">
      <div className="bp_title">
        <h1 className='text-center text-capitalize ' style={{ color: 'teal', fontSize: '23px',margin:0 }}>{id ? "Chỉnh sửa bài viết" : 'Tạo bài viết mới'}</h1>
      </div>
      <div className="blog_content">
        <div className="createForm_section">
          <p
            className="create_p"
            style={{ padding: 0, margin: 0, textAlign: "center" }}
          >
            Tạo mới
            <hr style={{ color: 'blueviolet' }} />
          </p>
          <CreateForm blog={blog} setBlog={setBlog} />
        </div>
        <div className="preview_section">
          <p
            className="create_p"
            style={{ padding: 0, margin: 0, textAlign: "center" }}
          >
            Xem Trước
            <hr style={{ color: 'blueviolet' }} />
          </p>
          <CardPreview blog={blog} />
        </div>
      </div>
      <div className="editBlog_content">
        <EditBox setBody={setBody} body={body} />
        <div ref={divRef} dangerouslySetInnerHTML={{
          __html: body
        }} style={{ display: 'none' }} />

        <small style={{ float: 'right' }}>{text.length}</small>
      </div>
      <div className="create_btn">
        <button className="btn_create" onClick={handleSubmit}>
          <span className="create_span">{id ? 'Update' : 'Create'} </span>
          <div className="liquid"></div>
        </button>
      </div>
    </div>
  );
};

export default Createblog;
