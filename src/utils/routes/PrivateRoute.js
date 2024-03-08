import useAuth from '@/hooks/useAuth';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth(); 

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/auth/sign-in" />
      }
    />
  );
};

export default PrivateRoute;
