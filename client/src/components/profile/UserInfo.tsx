import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { RootStore, InputChange, IUserProfile, FormSubmit } from '../../utils/Type'

import NotFound from '../global/notfound'
import { updateUser, resetPass } from '../../redux/action/profileAction'

const UserInfo = () => {
  const initState = {
    name: '', account: '', avatar: '', password: '', cf_password: ''
  }

  const { authReducer } = useSelector((state: RootStore) => state)
  const dispatch = useDispatch()

  const [user, setUser] = useState<IUserProfile>(initState)
  const [typePass, setTypePass] = useState(false)
  const [typeCfPass, setTypeCfPass] = useState(false)

  const handleChangeInput = (e: InputChange) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const handleChangeFile = (e: InputChange) => {
    const target = e.target as HTMLInputElement
    const files = target.files

    if (files) {
      const file = files[0]
      setUser({ ...user, avatar: file })
    }
  }
  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()
    if (avatar || name)
      dispatch(updateUser((avatar as File), name, authReducer))
    if (password && authReducer.access_token)
      dispatch(resetPass(password, cf_password, authReducer.access_token))


  }

  const { name, avatar, password, cf_password } = user

  if (!authReducer.user) return <NotFound />
  return (
    <form className="profile_info" onSubmit={handleSubmit}>
      <div className="info_avatar">
        <img src={avatar ? URL.createObjectURL(avatar) : authReducer.user.avatar}
          alt="avatar"
        />

        <span>
          <i className="fas fa-camera" />
          <input type="file" accept="image/*"
            name="file" id="file_up"
            onChange={handleChangeFile} />
        </span>
      </div>
      <div className="input-field">
        <input type="text" className="form-control" id="name"
          name="name" defaultValue={authReducer.user.name}
          onChange={handleChangeInput} />
        <label htmlFor="name">Tên tài khoản</label>
      </div>
      <div className="input-field">
        <input type="email" className="form-control" id="name"
          name="name" defaultValue={authReducer.user.account}
          onChange={handleChangeInput} disabled={true} />

      </div>
      <div className="input-field">
        <input
          className="pswrd"
          type={typePass ? "text" : "password"}
          id="password"
          name="password"
          value={password}
          onChange={handleChangeInput}
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
          onChange={handleChangeInput}
        />
        <div className="lock-ico">
          <small onClick={() => setTypeCfPass(!typeCfPass)}>
            {typeCfPass ? <i className="fas fa-eye s_pass"></i> : <i className="fas fa-eye-slash s_pass"></i>}
          </small>
        </div>
        <label> Xác nhận lại mật khẩu</label>
      </div>




      <div className="button">
        <button
          className="btn-submit"
          type="submit"
        >
          Cập Nhập
        </button>
        <input type="submit" style={{ display: 'none' }} />
      </div>
      {
        authReducer.user.type !== 'register' &&
        <small className="text-danger">
          * Tài khoản đăng nhập với facebook không <br /> thể thực hiện chức năng này *
        </small>
      }
    </form>

  )
}

export default UserInfo
