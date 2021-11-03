import { Route, Switch } from "react-router-dom";
import Layout from "components/Layout";
import LoginPage from "components/LoginPage";
import * as URL from "./url";

export default (
  <Layout>
    <Switch>
      <Route path={URL.URL_LOGIN}>
        <LoginPage />
      </Route>
      <Route path={URL.DESCRIPTION_CREATOR}>
        <h1>asasdasddas</h1>
      </Route>
    </Switch>
  </Layout>
);
