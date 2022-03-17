import ChangeFormPass from "./ChangeFromPass";
import classes from "./userprofile.module.css";
import { Route, useLocation } from "react-router-dom";
import ListNote from "../newNote/ListNote";
import Map from "../map/Map";
import { ContextMapProvider } from "../../store/map-context";

function UserProfile() {
  let location = useLocation();

  const disappearWelcome = location.pathname === "/profile";

  return (
    <div className={classes.profile}>
      {disappearWelcome && <h1>Welcome to your Page.Click on Profile !!</h1>}
      <Route path="/profile/change-password">
        <ChangeFormPass />
      </Route>
      <Route path="/profile/take-note">
        <ListNote />
      </Route>
      <Route path="/profile/map">
        <ContextMapProvider>
          <Map />
        </ContextMapProvider>
      </Route>
    </div>
  );
}

export default UserProfile;
