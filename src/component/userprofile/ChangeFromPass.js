import { useRef, useContext, useState } from "react";
import classes from "./changeformpass.module.css";
import useHttp from "../hooks/use-http";
import AuthContext from "../../store/auth-context";
function ChangeFormPass(props) {
  const [porveMessage, setProveMessage] = useState(false);
  const changePasswordRef = useRef();
  const ctx = useContext(AuthContext);
  const { error, sendRequest: signInUp, setError } = useHttp();

  const key = process.env.REACT_APP_KEY;

  if (
    error.errorData === "TOKEN_EXPIRED" ||
    error.errorData === "INVALID_ID_TOKEN"
  ) {
    setError({ ...error, errorData: "you must sign in again" });
  }

  const submitHandler = (e) => {
    setProveMessage(false);
    e.preventDefault();
    const enteredChangedPassword = changePasswordRef.current.value;
    signInUp({
      url: "https://identitytoolkit.googleapis.com/v1/accounts:update?key=",
      key: key,
      method: "POST",
      body: {
        idToken: ctx.token,
        password: enteredChangedPassword,
        returnSecureToken: false,
      },
      headers: { "Content-Type": "application/json" },
    }).then((data) => {
      console.log(data);
      if (data) {
        setProveMessage(true);
      }
    });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      {!porveMessage && (
        <div>
          <div>
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              id="password"
              ref={changePasswordRef}
              autoFocus
            />
            {error.isError && (
              <p className={classes.error}>{error.errorData}</p>
            )}
          </div>
          <div className={classes.apply}>
            <button>Change Password</button>
          </div>
        </div>
      )}
      {porveMessage && <p>Password changed successfully!</p>}
    </form>
  );
}

export default ChangeFormPass;
