import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootStore } from "../../utils/Type";
import { logout } from "../../redux/action/authAction";
const Dropdown = () => {
  const { authReducer } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const bfLog = [
    { label: "Đăng Nhập", path: "/login" },
    { label: "Đăng Ký", path: "/register" },

  ];
  const afLogLink = [{ label: "Đăng bài", path: "/create_blog" }];
  const navLink = authReducer.access_token ? afLogLink : bfLog;

  const isActive = (pname: string) => {
    if (pname === pathname) return "nav-active";
  };
  const handleLogout=()=>{
    if(!authReducer.access_token)return
    dispatch(logout(authReducer.access_token))
  }

  return (
    <ul className="logBtn">
      {navLink.map((link, index) => (
        <li key={index} className={`menu-item ${isActive(link.path)}`}>
          <Link className="nav-link" to={link.path}>
            {link.label}
          </Link>
        </li>
      ))}
      {
        authReducer.user?.role==='admin'&&
        <li className={`menu-item ${isActive('/category')}`}>
          <Link to='/category'className="nav-link">Thể Loại</Link>
        </li>
      }



      {authReducer.user && (
        <div className="dropdown">
          <div className="dropdown__select">
            <img src={authReducer.user.avatar} alt="" className="avatar" />
          </div>
          <ul className="dropdown__list">
            <li className="dropdown__item">
              <span className="dropdown__text">
              <Link className="sub-item" to={`/profile/${authReducer.user._id}`}>
                 {authReducer.user.name}
               </Link>
              </span>
              <i className="fa fa-user dropdown__icon"></i>
            </li>
            <li className="dropdown__item">
              <span className="dropdown__text">
                <Link
                  className="sub-item"
                  to="/"
                  onClick={handleLogout}
                >
                  Đăng Xuất
                </Link>
              </span>
              <i className="fa fa-sign-out-alt dropdown__icon"></i>
            </li>
          </ul>
        </div>
      )}
    </ul>
  );
};

export default Dropdown;
