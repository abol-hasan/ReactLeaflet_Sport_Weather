import LayOut from "./component/Layout/LayOut";
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import AuthContext from "./store/auth-context";
import { useContext } from "react";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";

function App() {
  const ctx = useContext(AuthContext);

  return (
    <LayOut>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        {!ctx.isLogedIn && (
          <Route path="/auth" exact>
            <AuthPage />
          </Route>
        )}
        <Route path="/auth/reset-password">
          <ForgetPasswordPage />
        </Route>
        {ctx.isLogedIn && (
          <Route path="/profile">
            <ProfilePage />
          </Route>
        )}
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </LayOut>
  );
}

export default App;
