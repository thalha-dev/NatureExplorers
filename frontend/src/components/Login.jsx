import { useEffect, useState } from "react";
import { AiFillWarning } from "react-icons/ai";
import {
  getIndividualErrorMessageCB,
  getIndividualErrorMessageFromCB,
  getLoginStatusCB,
  login,
  refreshAccessTokenInitial,
} from "../../state/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getArticles } from "../../state/slice/articleSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginStatus = useSelector(getLoginStatusCB);
  const errorMessage = useSelector(getIndividualErrorMessageCB);
  const errorMessageFrom = useSelector(getIndividualErrorMessageFromCB);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshAccessTokenInitial());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userCredentials = {
      username: username,
      password: password,
    };

    dispatch(login(userCredentials));
  };

  return (
    <div className="login-form-container" onSubmit={handleSubmit}>
      {loginStatus === "success" ? <Navigate to="/articles" /> : ""}
      <form>
        <h1>LOGIN</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          className={`login-button ${
            loginStatus === "loading" ? "button-disable" : ""
          }`}
        >
          SUBMIT
        </button>
        {errorMessage && errorMessageFrom === "login" ? (
          <div className="login-error-msg">
            <AiFillWarning className="login-error-sign" />
            <div>{errorMessage}</div>
          </div>
        ) : (
          ""
        )}
        {loginStatus === "loading" ? (
          <div className="login-loading-msg">loading...</div>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};

export default Login;
