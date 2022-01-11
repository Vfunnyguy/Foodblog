import { Dispatch } from "redux";
import { IBlog } from "../../utils/Type";
import { imageUpload } from "../../utils/ImgUp";
import { postAPI,getAPI,putAPI,deleteAPI } from "../../utils/Fetch";
import { ALERT, IAlertType } from "../types/alertType";
import {
  GET_HOME_BLOGS,
  IGetHomeBlogsType,
  IGetBlogsCategoryType,
  GET_BLOGS_CATEGORY_ID,
  GET_BLOGS_USER_ID,
  IGetBlogsUserType,
  CREATE_BLOGS_USER_ID,
  ICreateBlogUserType,
  DELETE_BLOGS_USER_ID,
  IDeleteBlogUserType
} from '../types/blogType'
import { checkTokenExp } from "../../utils/checkToken";
export const createBlog =(blog: IBlog, token: string) => async (dispatch: Dispatch<IAlertType|ICreateBlogUserType>) => {
  const ketqua=await checkTokenExp(token,dispatch)
  const access_token=ketqua?ketqua:token
    let url;
    try {
        dispatch({type:ALERT,payload:{loading:true}})
        if(typeof(blog.thumbnail)!=='string'){
            const photo=await imageUpload(blog.thumbnail)
            url=photo.url
        }else{
            url=blog.thumbnail
        }
        const newBlog={...blog,thumbnail:url}
        const res=await postAPI('blog',newBlog,access_token)
        dispatch({
          type: CREATE_BLOGS_USER_ID,
          payload: res.data
        })

        dispatch({type:ALERT,payload:{loading:false}})

    } catch (error:any) {
        dispatch({ type: ALERT, payload: {erros: error.response.data.msg} })
    }
}
export const getHomeBlog=()=>async(dispatch:Dispatch<IAlertType|  IGetHomeBlogsType> )=>{
try {
  dispatch({type:ALERT,payload:{loading:true}})
  const res=await getAPI('/home/getBlog')
  dispatch({
    type:GET_HOME_BLOGS,
    payload:res.data
  })
  dispatch ({type:ALERT,payload:{loading:false}})
} catch (error:any) {
  dispatch({ type: ALERT, payload: {erros: error.response.data.msg} })
}
}
export const getBlogsByCategoryId = (id: string,search:string) => 
async (dispatch: Dispatch<IAlertType | IGetBlogsCategoryType>) => {
  try {
    let limit=8
    let value=search?search:`?page=${1}`
    dispatch({ type: ALERT, payload: { loading: true } })

    const res = await getAPI(`getBlog/category/${id}${value}&limit=${limit}`)
    console.log(res)

    dispatch({
      type: GET_BLOGS_CATEGORY_ID,
      payload: {...res.data, id }
    })
    
    dispatch({ type: ALERT, payload: { loading: false } })
  } catch (err: any) {
    dispatch({ type: ALERT, payload: {erros: err.response.data.msg} })
  }
}
export const getBlogByUserID = (id: string, search: string) => 
async (dispatch: Dispatch<IAlertType | IGetBlogsUserType>) => {
  try {
    let limit = 4;
    let value = search ? search : `?page=${1}`;

    dispatch({ type: ALERT, payload: { loading: true } })

    const res = await getAPI(`getBlog/user/${id}${value}&limit=${limit}`)

    dispatch({
      type: GET_BLOGS_USER_ID,
      payload: {...res.data, id, search }
    })
    
    dispatch({ type: ALERT, payload: { loading: false } })
  } catch (err: any) {
    dispatch({ type: ALERT, payload: {erros: err.response.data.msg} })
  }
}
export const updateBlog =(blog: IBlog, token: string) => async (dispatch: Dispatch<IAlertType>) => {
  const ketqua=await checkTokenExp(token,dispatch)
  const access_token=ketqua?ketqua:token
    let url;
    try {
        dispatch({type:ALERT,payload:{loading:true}})
        if(typeof(blog.thumbnail)!=='string'){
            const photo=await imageUpload(blog.thumbnail)
            url=photo.url
        }else{
            url=blog.thumbnail
        }
        const newBlog={...blog,thumbnail:url}
        const res=await putAPI(`getBlog/${newBlog._id}`,newBlog,access_token)
        dispatch({type:ALERT,payload:{success:res.data.msg}})

    } catch (error:any) {
        dispatch({ type: ALERT, payload: {erros: error.response.data.msg} })
    }
}
export const deleteBlog=(blog:IBlog,token:string)=>async (dispatch:Dispatch<IAlertType | IDeleteBlogUserType >) => {
  const ketqua=await checkTokenExp(token,dispatch)
  const access_token=ketqua?ketqua:token
  try {
    dispatch({
      type: DELETE_BLOGS_USER_ID,
      payload: blog
    })
    await deleteAPI(`getBlog/${blog._id}`, access_token)
  } catch (error:any) {
    dispatch({ type: ALERT, payload: {erros: error.response.data.msg} })

    
  }
  
}