import { useState, useRef, useContext } from "react";
import classes from "./auth.module.css";
import useHttp from "../hooks/use-http";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";

const key = process.env.REACT_APP_KEY;

function AuthForm() {
  const [logIn, setLogIn] = useState(true);
  const { error, sendRequest: signInUp, setError } = useHttp();
  const enteredEmailUseRef = useRef();
  const enteredPasswordUseRef = useRef();
  const ctx = useContext(AuthContext);
  const history = useHistory();

  const createHandler = () => {
    setLogIn(!logIn);
    setError({ isError: false, errorData: "" });
  };
  const resetPasswordHandler = () => {
    ctx.falseEmail();
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = enteredEmailUseRef.current.value;
    const enteredPassword = enteredPasswordUseRef.current.value;

    if (logIn) {
      signInUp({
        url: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=",
        key: key,
        method: "POST",
        body: {
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }).then((data) => {
        if (data) {
          ctx.login(data.idToken);
          history.replace("/profile");
        }
      });
    } else {
      signInUp({
        url: "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=",
        key: key,
        method: "POST",
        body: {
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }).then((data) => {
        if (data) {
          ctx.login(data.idToken);
          history.replace("/");
        }
      });
    }
  };
  return (
    <section className={classes.sec}>
      {ctx.isEmail && (
        <p className={classes.resetmail}>Please check your Email</p>
      )}
      <h1>{logIn ? "Login" : "SignUp"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.fordiv}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" required ref={enteredEmailUseRef} />
        </div>
        <div className={classes.fordiv}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            ref={enteredPasswordUseRef}
          />
          {error.isError && <p>{error.errorData}</p>}

          <div className={classes.link}>
            <Link to="/auth/reset-password">
              <p>Change Password</p>
            </Link>
            <p>Forget password!?</p>
          </div>
        </div>
        <div className={classes.logacc}>
          <button onClick={resetPasswordHandler}>
            {logIn ? "Login" : "Create Account"}
          </button>
          <button onClick={createHandler}>
            {logIn ? "Create new Account" : "Login with your Account"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
