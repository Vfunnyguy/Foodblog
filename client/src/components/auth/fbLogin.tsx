import React from "react";
import { useDispatch } from "react-redux";
import {
  FacebookLogin,
  FacebookLoginAuthResponse,
} from "react-facebook-login-lite";
import { facebookLogin } from "../../redux/action/authAction";
const FbLogin = () => {
    const dispatch=useDispatch()
  const onSuccess = (response: FacebookLoginAuthResponse) => {
      const {accessToken,userID}=response.authResponse
      dispatch(facebookLogin(accessToken,userID))
  };

  return (
    <div>
      <FacebookLogin appId="347001503453805" onSuccess={onSuccess} />,
    </div>
  );
};

export default FbLogin;
