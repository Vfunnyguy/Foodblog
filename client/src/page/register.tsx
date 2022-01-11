import React from 'react'
import { Link } from 'react-router-dom'

import RegisterForm from '../components/auth/registerForm'
const Register = () => {
    return (
       
             <div className="login-form">
                 <div className="containers">
                 <header >Đăng Ký</header>
                     <RegisterForm/>
                 </div>
             </div>
           
        
    )
}

export default Register
