import { Dispatch } from 'redux'
import { IAuth, IAuthType, AUTH } from '../types/authType'
import { IAlertType, ALERT } from '../types/alertType'
import { checkImage, imageUpload } from '../../utils/ImgUp'
import { patchAPI,getAPI } from '../../utils/Fetch'
import { checkPassword } from '../../utils/Valid'
import { 
  GET_OTHER_INFO,
  IGetOtherInfoType
} from '../types/profileType'
import { checkTokenExp } from '../../utils/checkToken'
export const updateUser = (
  avatar: File, name: string, auth: IAuth
) => async (dispatch: Dispatch<IAlertType | IAuthType>) => {
  if (!auth.access_token || !auth.user) return;
  const ketqua=await checkTokenExp(auth.access_token,dispatch)
  const access_token=ketqua?ketqua:auth.access_token
  let url = '';
  try {
    dispatch({ type: ALERT, payload: { loading: true } })
    if (avatar) {
      const check = checkImage(avatar)
      if (check)
        return dispatch({ type: ALERT, payload: { erros: check } })

      const photo = await imageUpload(avatar)
      url = photo.url
    }

    dispatch({
      type: AUTH,
      payload: {
        access_token: auth.access_token,
        user: {
          ...auth.user,
          avatar: url ? url : auth.user.avatar,
          name: name ? name : auth.user.name
        }
      }
    })

    const res = await patchAPI('user', {
      avatar: url ? url : auth.user.avatar,
      name: name ? name : auth.user.name
    },access_token)

    dispatch({ type: ALERT, payload: { success: res.data.msg } })

  } catch (err: any) {
    dispatch({ type: ALERT, payload: { erros: err.response.data.msg } })
  }
}
export const resetPass = (
  password: string, cf_password: string, token: string
) => async (dispatch: Dispatch<IAlertType | IAuthType>) => {

  const ketqua=await checkTokenExp(token,dispatch)
  const access_token=ketqua?ketqua:token
  const msg = checkPassword(password, cf_password)
  if(msg) return dispatch({ type: ALERT, payload: {erros: msg}})
  try {
    dispatch({ type: ALERT, payload: {loading: true}})

    const res = await patchAPI('reset_password', { password }, access_token)

    dispatch({ type: ALERT, payload: {success: res.data.msg}})

  } catch (err: any) {
    dispatch({ type: ALERT, payload: {erros: err.response.data.msg}})
  }
}
export const getOtherInfo=(id:string)=>async (dispatch:Dispatch<IAlertType| IGetOtherInfoType>) => {
try {
  dispatch({type:ALERT,payload:{loading:true}})
  const res=await getAPI(`/user/${id}`)
  
  dispatch({
    type: GET_OTHER_INFO,
    payload: res.data
  })
  dispatch({ type: ALERT, payload: { }})
} catch (error:any) {
  dispatch({type:ALERT,payload:{erros:error.respone.data.msg}})
  
}  
}