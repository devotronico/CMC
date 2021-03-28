import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import LoaderWeb from '../layout/LoaderWeb';

const Dashboard = React.lazy(() => import('../dashboard/Dashboard'));
const Settings = React.lazy(() => import('../dashboard/Settings'));
const Login = React.lazy(() => import('../auth/Login'));
const Register = React.lazy(() => import('../auth/Register'));
const ResetPassword = React.lazy(() => import('../auth/ResetPassword'));
const VerifyAccount = React.lazy(() => import('../auth/VerifyAccount'));
const NewPassword = React.lazy(() => import('../auth/NewPassword'));

const Posts = React.lazy(() => import('../posts/Posts'));
const Post = React.lazy(() => import('../post/Post'));

const Error = React.lazy(() => import('../error/Error'));

const RoutesPublic = () => {
  let routes = (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/settings" component={Settings} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/reset-password" component={ResetPassword} />
      <Route exact path="/verify/:hash" component={VerifyAccount} />
      <Route exact path="/new-password/:hash" component={NewPassword} />
      <Route exact path="/post/id/:id" component={Post} />
      <Route exact path="/posts" component={Posts} />
      <Route exact path="/error" component={Error} />
      <Redirect to="/error" />
    </Switch>
  );

  return (
    <>
      <Suspense
        fallback={
          <div className="center">
            <LoaderWeb />
          </div>
        }
      >
        {routes}
      </Suspense>
    </>
  );
};

export default RoutesPublic;
