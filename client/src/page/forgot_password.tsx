import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import { quenPass } from '../redux/action/authAction'
import { FormSubmit } from '../utils/Type'

const Forgot = () => {
    const [account,setAccount]=useState('')
    const dispatch=useDispatch()
    const xacNhan=(e:FormSubmit)=>{
        e.preventDefault()
        dispatch(quenPass(account))
    }
    return (
        <div className='forgot_page'>
            <section className="forgot_body">
                <div className="forgot_form" >
                    <form  className="forgot-form" onSubmit={xacNhan}>
                        <h3>Quên Mật Khẩu?</h3>
                        <div className="input-field">
                            <input type="email" required id="account"name='account'onChange={e=>setAccount(e.target.value)}/>
                            <label>Nhập Email của bạn</label>
                        </div>
                        <div className="btn_reset">
                            <button type='submit'>
                                <i className='fas fa-paper-plane'style={{color:'white'}}>
                                Gửi
                                </i>
                            </button>
                        </div>
                       
                    </form>
                </div>
            </section>
        </div>
    )
}

export default Forgot
