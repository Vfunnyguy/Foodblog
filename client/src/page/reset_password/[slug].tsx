import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { IParams, FormSubmit } from '../../utils/Type'
import { resetPass } from '../../redux/action/profileAction'
const ResetPass = () => {
    const token = useParams<IParams>().slug
    const dispatch = useDispatch()
    const [password, setPassword] = useState('')
    const [cf_password, setCfPassword] = useState('')
    const [typePass, setTypePass] = useState(false)
    const [typeCfPass, setTypeCfPass] = useState(false)
    const handleSubmit = (e: FormSubmit) => {
        e.preventDefault()
        dispatch(resetPass(password, cf_password, token))
    }
    return (
        <div className='reset_page'>
            <h1 className="text-center">
                Cấp lại mật khẩu
            </h1>
            <section className="reset_form">
                <div className="forgot_form" >
                    <form className="forgot-form" onSubmit={handleSubmit}>
                        <h3>Nhập mật khẩu mới</h3>
                        <div className="input-field">
                            <input
                                className="pswrd"
                                type={typePass ? "text" : "password"}
                                id="password"
                                name="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <div className="lock-ico">
                                <small onClick={() => setTypePass(!typePass)}>
                                    {typePass ? <i className="fas fa-eye s_pass"></i> : <i className="fas fa-eye-slash s_pass"></i>}
                                </small>
                            </div>

                            <label>Mật Khẩu</label>
                        </div>
                        <div className="input-field">
                            <input
                                className="pswrd"
                                type={typeCfPass ? "text" : "password"}
                                id="cf_password"
                                name="cf_password"
                                value={cf_password}
                                onChange={e => setCfPassword(e.target.value)}
                            />
                            <div className="lock-ico">
                                <small onClick={() => setTypeCfPass(!typeCfPass)}>
                                    {typeCfPass ? <i className="fas fa-eye s_pass"></i> : <i className="fas fa-eye-slash s_pass"></i>}
                                </small>
                            </div>
                            <label> Xác nhận lại mật khẩu</label>
                        </div>
                        <div className="btn_reset">
                            <button type='submit'>
                                <i className='fas fa-check-double' style={{ color: 'white' }}>
                                Cập Nhập
                                </i>
                            </button>
                        </div>

                    </form>
                </div>
            </section>
        </div>
    )
}

export default ResetPass
