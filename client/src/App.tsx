import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PageRender from "./PageRender";
import Navbar from "./components/global/navBar";
import { Alert } from "./components/alert/Alert";
import { refreshToken } from "./redux/action/authAction";
import { getCategories } from "./redux/action/categoryAction";
import { getHomeBlog } from "./redux/action/blogAction";
import io from "socket.io-client";
import SocketClient from "./SocketClient";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHomeBlog());
    dispatch(getCategories());
    dispatch(refreshToken());
  }, [dispatch]);
  useEffect(() => {
    const socket = io();
    dispatch({ type: "SOCKET", payload: socket });
    return () => {
      socket.close();
    };
  }, [dispatch]);
  return (
    <div className="container">
      <SocketClient />
      <Router>
        <Alert />
        <Navbar />
        <Switch>
          <Route exact path="/" component={PageRender} />
          <Route exact path="/:page" component={PageRender} />
          <Route exact path="/:page/:slug" component={PageRender} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
