import { Dispatch } from 'redux'
import { ALERT, IAlertType } from '../types/alertType'
import { 
  TAO_THELOAI, IKieuTheLoai, GET_CATEGORIES,UPDATE_CATEGORY,
  DELETE_CATEGORY
} from '../types/categoryType'
import { ITheLoai } from '../../utils/Type'
import { postAPI, getAPI, patchAPI, deleteAPI } from '../../utils/Fetch'
import { checkTokenExp } from '../../utils/checkToken'

export const createCategory = (name: string, token: string) => 
async(dispatch: Dispatch<IAlertType | IKieuTheLoai>) => {
  const ketqua=await checkTokenExp(token,dispatch)
  const access_token=ketqua?ketqua:token
  try {
    dispatch({ type: ALERT, payload: { loading: true }})

    const res = await postAPI('category', { name }, access_token)

    dispatch({
      type: TAO_THELOAI,
      payload: res.data.newCategory
    })

    dispatch({ type: ALERT, payload: { loading: false }})
  } catch (err: any) {
    dispatch({ type: ALERT, payload: { erros: err.response.data.msg }})
  }
}

export const getCategories = () => 
async(dispatch: Dispatch<IAlertType |IKieuTheLoai>) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true }})

    const res = await getAPI('category')
    
    dispatch({
      type: GET_CATEGORIES,
      payload: res.data.categories
    })

    dispatch({ type: ALERT, payload: { loading: false }})
  } catch (err: any) {
    dispatch({ type: ALERT, payload: { erros: err.response.data.msg }})
  }
}
export const updateCategory=(data:ITheLoai,token:string)=>async(dispatch:Dispatch<IAlertType|IKieuTheLoai>)=>{
  const ketqua=await checkTokenExp(token,dispatch)
  const access_token=ketqua?ketqua:token
try {
  dispatch({ type: UPDATE_CATEGORY, payload: data })
  await patchAPI(`category/${data._id}`, { name: data.name }, access_token)
} catch (error:any) {
  dispatch({ type: ALERT, payload: { erros: error.response.data.msg }})
}
}
export const deleteCategory = (id: string, token: string) => 
async(dispatch: Dispatch<IAlertType | IKieuTheLoai>) => {
  const ketqua=await checkTokenExp(token,dispatch)
  const access_token=ketqua?ketqua:token
  try {
    
    dispatch({ type: DELETE_CATEGORY, payload: id })
    await deleteAPI(`category/${id}`, access_token)

  } catch (err: any) {
    dispatch({ type: ALERT, payload: { erros: err.response.data.msg }})
  }
}