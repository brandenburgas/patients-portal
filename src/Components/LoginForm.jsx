import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "./LoginForm.module.css";
import { validatePassword, validateUsername } from "../utils/helpers";
import { getAuthenticated } from "../store/authActions";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error: isError, loading: isLoading } = useSelector(
    (state) => state.auth
  );
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleLogin = (event) => {
    event.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    if (!username || !password) {
      return;
    }

    const usernameValid = validateUsername(username);
    usernameValid ? setUsernameError(false) : setUsernameError(true);
    const passwordValid = validatePassword(password);
    passwordValid ? setPasswordError(false) : setPasswordError(true);

    const credentials = JSON.stringify({
      username,
      password,
    });

    dispatch(
      getAuthenticated(
        {
          credentials,
        },
        navigate
      )
    );
  };

  return (
    <>
      {" "}
      {!isLoading ? (
        <form
          className={styles.content}
          onSubmit={handleLogin}
          data-testid={"loginForm"}
        >
          <div className={styles.inputContainer}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              ref={usernameRef}
              placeholder="username@example.com"
              className={styles.input}
              data-testid={"inputUsername"}
              required
            />
            {usernameError && (
              <p className={styles.inputError}>Please enter a valid username</p>
            )}
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              ref={passwordRef}
              className={styles.input}
              data-testid={"inputPassword"}
              required
            />
            {passwordError && (
              <p className={styles.inputError}>Please enter a valid password</p>
            )}
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.buttonLogin}>LOGIN</button>
          </div>
          {isError && <p className={styles.loginError}>{isError}</p>}
        </form>
      ) : (
        <div className={styles.content}>Loading...</div>
      )}
    </>
  );
};

export default LoginForm;
