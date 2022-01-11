import React,{useEffect} from 'react'
import LoginForm from '../components/auth/loginForm'
import {useSelector}from 'react-redux'
import { RootStore } from '../utils/Type'
import { Link, useHistory } from 'react-router-dom'
import FbLogin from '../components/auth/fbLogin'
const Login = () => {
const history=useHistory()
  const {authReducer}=useSelector((state:RootStore)=>state)
  useEffect(()=>{
    if(authReducer.access_token) {
      let url=history.location.search.replace('?',"/")
       return history.push(url)
    }

  },[authReducer.access_token,history])
    return (
        <div className="login-form">
        <div className="containers">
        <header >Đăng Nhập</header>
        <LoginForm/>
        <div className="auth">Hoặc Đăng Nhập với</div>
      
          <FbLogin/>
       
        <div className="signup">
          Chưa có tài khoản? <Link to={`/register${history.location.search}`}>Đăng ký ngay !</Link>
        </div>
        </div>
      </div>
    )
}

export default Login
