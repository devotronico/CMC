import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
// import Dashboard from '../dashboard/Dashboard';
// import Login from '../auth/Login';
// import Register from '../auth/Register';
// import Logout from '../auth/Logout';
// import Posts from '../posts/Posts';
// import Post from '../posts/Post';
// import PostCreate from '../posts/PostCreate';
// import Profiles from '../profile/Profiles';

// import { loadUser } from '../../redux/auth/authActions';

import Spinner from '../layout/Spinner';

import PrivateRoute from './PrivateRoute';
import PrivateRouteRole from './PrivateRouteRole';

const Dashboard = React.lazy(() => import('../dashboard/Dashboard'));
const Login = React.lazy(() => import('../auth/Login'));
const Register = React.lazy(() => import('../auth/Register'));
const Logout = React.lazy(() => import('../auth/Logout'));
const Posts = React.lazy(() => import('../posts/Posts'));
const Post = React.lazy(() => import('../posts/Post'));
const PostCreate = React.lazy(() => import('../posts/PostCreate'));
const Profiles = React.lazy(() => import('../profile/Profiles'));

const Routes = () => {
  // useEffect(() => {
  //   store.dispatch(loadUser());
  // }, []);

  let routes = (
    <Switch>
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/posts" component={Posts} />
      <Route exact path="/posts/:id" component={Post} />
      <Route exact path="/posts/create" component={PostCreate} />
      <PrivateRouteRole
        exact
        path="/profiles"
        roles={['system', 'admin']}
        component={Profiles}
      />
    </Switch>
  );

  return (
    <>
      <Suspense
        fallback={
          <div className="center">
            <Spinner />
          </div>
        }
      >
        {routes}
      </Suspense>
    </>
  );
};

export default Routes;
