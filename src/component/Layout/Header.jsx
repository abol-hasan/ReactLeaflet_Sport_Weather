import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import classes from "./header.module.css";
import AuthContext from "../../store/auth-context";

function Header() {
  const history = useHistory();
  const ctx = useContext(AuthContext);
  const [opacity, setOpacity] = useState(true);

  const logoutHandler = () => {
    ctx.logout();
    history.replace("/");
  };

  const changeOpacityHandler = () => {
    setOpacity(!opacity);
  };
  const dropHandler = () => {
    setOpacity(!opacity);
  };

  return (
   
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.brand}>WorkoutMap</div>
      </Link>

      <nav>
        <div>
          <ul>
            <ul className={classes.dropdown}>
              {ctx.isLogedIn && (
                <li>
                  <button onClick={dropHandler} className={classes.profilelink}>
                    Profile <span>&#8595;</span>
                  </button>
                </li>
              )}
              <div
                
                onClick={changeOpacityHandler}
                className={
                  opacity ? classes.underprofile : classes.underprofileopacity
                }
              >
                {ctx.isLogedIn && (
                  <div>
                    <li>
                      <Link
                        to="/profile/change-password"
                        className={
                          opacity ? classes.change : classes.changeopacity
                        }
                      >
                        Change Password
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/profile/take-note"
                        className={
                          opacity ? classes.change : classes.changeopacity
                        }
                      >
                        Take Note
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/profile/map"
                        className={
                          opacity ? classes.change : classes.changeopacity
                        }
                      >
                        Map
                      </Link>
                    </li>
                  </div>
                )}
              </div>
            </ul>
            {!ctx.isLogedIn && (
              <li>
                <Link className={classes.loglink} to="/auth">
                  Login
                </Link>
              </li>
            )}

            {ctx.isLogedIn && (
              <li>
                <button className={classes.logout} onClick={logoutHandler}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
