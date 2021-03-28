import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const RouteRole = ({ component: Component, role, ...rest }) => {
  const { roles } = rest;
  // console.log('rest', rest);
  // console.log('roles', roles);
  // console.log('role', role);
  // console.log('Component', Component);

  const canAccess = roles.includes(role);
  // console.log('canAccess', canAccess);

  return (
    <Route
      {...rest}
      render={props =>
        canAccess ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default RouteRole;
