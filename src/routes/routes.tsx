import { Route, Switch } from 'react-router-dom';
import Layout from 'components/Layout';
import LoginPage from 'components/LoginPage';
import Accountacy from 'modules/Accountacy';
import DescriptionCreator from 'modules/DescriptionCreator/DescriptionCreator';
import HomePage from 'modules/HomePage';
import PrivateRoute from './PrivateRoute';
import * as URL from './url';

export default (
  <Layout>
    <Switch>
      <Route exact path={URL.ROOT}>
        <HomePage />
      </Route>
      <Route path={URL.LOGIN}>
        <LoginPage />
      </Route>
      <PrivateRoute
        path={URL.DESCRIPTION_CREATOR}
        component={DescriptionCreator}
      />
      <PrivateRoute path={URL.ACCOUNTANCY} component={Accountacy} />
    </Switch>
  </Layout>
);
