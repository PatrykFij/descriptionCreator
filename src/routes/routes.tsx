import { Route, Switch } from 'react-router-dom';
import Layout from 'components/Layout';
import Accountancy from 'modules/Accountancy';
import LoginPage from 'modules/Auth/LoginPage';
import DescriptionCreator from 'modules/DescriptionCreator/DescriptionCreator';
import HomePage from 'modules/HomePage';
import PrivateRoute from './PrivateRoute';
import SubmenuGenerator from './SubmenuGenerator'
import * as URL from './url';

export default (
  <Layout>
    <Switch>
      <PrivateRoute exact path={URL.ROOT}>
        <HomePage />
      </PrivateRoute>
      <PrivateRoute
        path={URL.DESCRIPTION_CREATOR}
        component={DescriptionCreator}
      />
      <PrivateRoute path={URL.ACCOUNTANCY} component={Accountancy} />
      <Route exact path={URL.LOGIN}>
        <LoginPage />
      </Route>
      <Route exact path={'/test'}>
        <SubmenuGenerator />
      </Route>
    </Switch>
  </Layout>
);
