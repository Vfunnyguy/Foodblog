import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { InputChange, FormSubmit } from "../../utils/Type";
import { register } from "../../redux/action/authAction";

const RegisterForm = () => {
  const initialState = {
    name: "",
    account: "",
    password: "",
    cf_password: "",
  };
  const [userRegister, setUserRegister] = useState(initialState);
  const { name, account, password, cf_password } = userRegister;

  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);
  const dispatch = useDispatch();

  const handleChangeInput = (e: InputChange) => {
    const { value, name } = e.target;
    setUserRegister({ ...userRegister, [name]: value });
  };

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
    dispatch(register(userRegister));
  };

  return (

      <form onSubmit={handleSubmit}>
      <div className="input-field">
        <input
          type="text"
          required
          id="name"
          name="name"
          value={name}
          onChange={handleChangeInput}
        />
        <label>Tên tài khoản</label>
      </div>
      <div className="input-field">
        <input
          type="email"
          required
          id="account"
          name="account"
          value={account}
          onChange={handleChangeInput}
        />
        <label>Email</label>
      </div>
      <div className="input-field">
        <input
          className="pswrd"
          type={typePass ? "text" : "password"}
          required
          id="password"
          name="password"
          value={password}
          onChange={handleChangeInput}
        />
        <div className="lock-ico">
        <small onClick={() => setTypePass(!typePass)}>
            {typePass ? <i className="fas fa-eye show_pass"></i> : <i className="fas fa-eye-slash show_pass"></i>}
          </small>
        </div>
        
        <label>Mật Khẩu</label>
      </div>
      <div className="input-field">
        <input
          className="pswrd"
          type={typeCfPass ? "text" : "password"}
          required
          id="cf_password"
          name="cf_password"
          value={cf_password}
          onChange={handleChangeInput}
        />
         <div className="lock-ico">
         <small onClick={() => setTypeCfPass(!typeCfPass)}>
            {typeCfPass ? <i className="fas fa-eye show_pass"></i> : <i className="fas fa-eye-slash show_pass"></i>}
          </small>
        </div>
        <label> Xác nhận lại mật khẩu</label>
      </div>

      <div className="button">
        <button
          className="btn-login"
          type="submit"
        >
          Đăng Ký
        </button>
        <input type="submit"style={{display:'none'}} />
      </div>
      </form>
  );
};

export default RegisterForm;
