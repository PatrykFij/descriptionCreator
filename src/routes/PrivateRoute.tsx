import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from 'components/AuthProvider/AuthProvider';
import * as URL from '../routes/url';

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  // Add your own authentication on the below line.
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: URL.LOGIN, state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
