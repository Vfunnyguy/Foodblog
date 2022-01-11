import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { InputChange, FormSubmit } from "../../utils/Type";
import { login } from "../../redux/action/authAction";


const LoginForm = () => {
  const initialState = { account: "", password: "" };
  const [user, setUser] = useState(initialState);
  const { account, password } = user;
  const handleChangeInput = (e: InputChange) => {
    const { value, name } = e.target;
    setUser({ ...user, [name]: value });
  };
  const [typePass, setTypePass] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
    dispatch(login(user));
  };
  

  return (
    <form onSubmit={handleSubmit}>
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
      <div className="chek">
        <ul className="sub-log">
          <li>
            <input type="checkbox" name="Remember Me" id="" />
            Ghi nhớ đăng nhập!
          </li>
          <li>
            <Link to="/forgot_password">Quên mật khẩu ?</Link>
          </li>
        </ul>
      </div>
      <div className="button">
        <button
          className="btn-login"
          type="submit"
        >
          Đăng Nhập
        </button>
        <input type="submit"style={{display:'none'}} />
      </div>
    </form>
  );
};

 export default LoginForm;
