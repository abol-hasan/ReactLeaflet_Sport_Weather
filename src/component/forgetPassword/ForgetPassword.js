import classes from "./forgetpassword.module.css";
import { useRef, useContext } from "react";
import useHttp from "../hooks/use-http";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";

const key = process.env.REACT_APP_KEY;
function ForgetPassword() {
  const emailRef = useRef();
  const history = useHistory();
  const ctx = useContext(AuthContext);
  const { error, sendRequest: signInUp } = useHttp();

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    signInUp({
      url: "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=",
      key: key,
      method: "POST",
      body: {
        requestType: "PASSWORD_RESET",
        email: enteredEmail,
      },
      headers: { "Content-Type": "application/json" },
    }).then((data) => {
      if (data) {
        ctx.email(data.email);
        history.replace("/auth");
      }
    });
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div>
        <div>
          <label htmlFor="email">Enter Email</label>
          <input type="email" id="email" ref={emailRef} />
          {error.isError && <p>{error.errorData}</p>}
        </div>
        <div className={classes.apply}>
          <button>Change Password</button>
        </div>
      </div>
    </form>
  );
}

export default ForgetPassword;
