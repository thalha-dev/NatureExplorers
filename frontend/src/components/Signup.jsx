import { useState } from "react";
import { AiFillWarning } from "react-icons/ai";
import {
  getIndividualErrorMessageCB,
  getIndividualErrorMessageFromCB,
  getSignupStatusCB,
  signup,
} from "../../state/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const signupStatus = useSelector(getSignupStatusCB);
  const errorMessage = useSelector(getIndividualErrorMessageCB);
  const errorMessageFrom = useSelector(getIndividualErrorMessageFromCB);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const inidividualRole =
      role === "WRITER"
        ? Number(import.meta.env.VITE_ROLE_WRITER)
        : Number(import.meta.env.VITE_ROLE_USER);

    const userCredentials = {
      username: username,
      email: email,
      password: password,
      role: inidividualRole,
    };

    dispatch(signup(userCredentials));
  };

  return (
    <div className="singup-form-container" onSubmit={handleSubmit}>
      {signupStatus === "success" ? (
        <Navigate to="/login" />
      ) : (
        <form>
          <h1>SIGNUP</h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
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
          <div className="signup-role-select">
            <label htmlFor="roleOptions">ROLE</label>
            <select
              id="roleOptions"
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
              }}
            >
              <option value="USER">Reader</option>
              <option value="WRITER">Content Creator</option>
            </select>
          </div>
          <button
            className={`signup-button ${
              signupStatus === "loading" ? "button-disable" : ""
            }`}
          >
            SUBMIT
          </button>
          {errorMessage && errorMessageFrom === "signup" ? (
            <div className="signup-error-msg">
              <AiFillWarning className="signup-error-sign" />
              <div>{errorMessage}</div>
            </div>
          ) : (
            ""
          )}
          {signupStatus === "loading" ? (
            <div className="signup-loading-msg">loading...</div>
          ) : (
            ""
          )}
        </form>
      )}
    </div>
  );
};

export default Signup;
