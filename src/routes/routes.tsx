import { Route, Switch } from "react-router-dom";
import Layout from "components/Layout";
import LoginPage from "components/LoginPage";
import DescriptionCreator from "modules/DescriptionCreator/DescriptionCreator";
import * as URL from "./url";
import PrivateRoute from "./PrivateRoute";
import Accountacy from "modules/Accountacy";

export default (
  <Layout>
    <Switch>
      <Route path={URL.LOGIN}>
        <LoginPage />
      </Route>
      <PrivateRoute path={URL.DESCRIPTION_CREATOR} component={DescriptionCreator} />
      <PrivateRoute path={URL.ACCOUNTANCY} component={Accountacy} />
    </Switch>
  </Layout>
);
