import { Dispatch } from 'redux'
import { AUTH, IAuthType } from '../types/authType'
import { ALERT, IAlertType } from '../types/alertType'
import { IUserLogin, IUserRegister } from '../../utils/Type'
import { postAPI, getAPI } from '../../utils/Fetch'
import { validRegister } from '../../utils/Valid'
import { checkTokenExp } from '../../utils/checkToken'

export const login = (userLogin: IUserLogin) => 
async (dispatch: Dispatch<IAuthType | IAlertType>) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } })

    const res = await postAPI('login', userLogin)
    
    dispatch({ type: AUTH,payload: res.data })

    dispatch({ type: ALERT, payload: { success: res.data.msg } })
    localStorage.setItem('logged', 'blogF')
    
  } catch (err: any) {
    dispatch({ type: ALERT, payload: { erros: err.response.data.msg } })
  }
}
export const register = (userRegister: IUserRegister) => 
async (dispatch: Dispatch<IAuthType | IAlertType>) => {
  const check = validRegister(userRegister)
  
  if(check.errLength > 0)
    return dispatch({ type: ALERT, payload: { erros: check.errMsg } })

  try {
    dispatch({ type: ALERT, payload: { loading: true } })
    
    const res = await postAPI('register', userRegister)

    dispatch({ type: ALERT, payload: { success: res.data.msg } })
  } catch (err: any) {
    dispatch({ type: ALERT, payload: { erros: err.response.data.msg } })
  }
}
export const refreshToken = () => 
async (dispatch: Dispatch<IAuthType | IAlertType>) => {
  const logged = localStorage.getItem('logged')
  if(logged !== 'blogF') return;

  try {
    dispatch({ type: ALERT, payload: { loading: true } })
    
    const res = await getAPI('refresh_token')
    
    dispatch({ type: AUTH,payload: res.data })

    dispatch({ type: ALERT, payload: { } })
  } catch (err: any) {
    dispatch({ type: ALERT, payload: { erros: err.response.data.msg } })
  }
}
export const logout = (token:string) => 
async (dispatch: Dispatch<IAuthType | IAlertType>) => {
  const eventum= await checkTokenExp(token, dispatch)
  const access_token =eventum?eventum: token
  try {
    localStorage.removeItem('logged')
    dispatch({type:AUTH,payload:{}})
    await getAPI('logout',access_token)
  } catch (err: any) {
    dispatch({ type: ALERT, payload: { erros: err.response.data.msg } })
  }
}
export const facebookLogin = (accessToken: string, userID: string) => 
async (dispatch: Dispatch<IAuthType | IAlertType>) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } })

    const res = await postAPI('facebook_login', { accessToken, userID })
    
    dispatch({ type: AUTH,payload: res.data })

    dispatch({ type: ALERT, payload: { success: res.data.msg } })
    localStorage.setItem('logged', 'blogF')
    
  } catch (err: any) {
    dispatch({ type: ALERT, payload: { erros: err.response.data.msg } })
  }
}
export const  quenPass=(account:string)=>async (dispatch:Dispatch<IAuthType|IAlertType>) => {
try {
  dispatch({type:ALERT,payload:{loading:true}})
  const res=await postAPI('forgot_password',{account})
  console.log(res)
  dispatch({ type: ALERT, payload: { success: res.data.msg } })
} catch (error:any) {
  return dispatch({type:ALERT,payload:{erros:error.response.data.msg}})
}
  
}