import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import LoaderWeb from '../layout/LoaderWeb';
import RouterRole from './RouterRole';

const Dashboard = React.lazy(() => import('../dashboard/Dashboard'));
const Error = React.lazy(() => import('../error/Error'));
const Settings = React.lazy(() => import('../dashboard/Settings'));
const Profile = React.lazy(() => import('../auth/Profile'));
const Logout = React.lazy(() => import('../auth/Logout'));
/// USERS
const UsersFake = React.lazy(() => import('../users/UsersFake'));
const UsersList = React.lazy(() => import('../users/UsersList'));
const UserCreate = React.lazy(() => import('../user/UserCreate'));
const UsersManager = React.lazy(() => import('../users/UsersManager'));
/// PROFILES
// const CreateProfile = React.lazy(() => import('../profile/CreateProfile'));
const ProfilesList = React.lazy(() => import('../profiles/ProfilesList'));
const ProfilesManager = React.lazy(() => import('../profiles/ProfilesManager'));
/// LOGS
const Logs = React.lazy(() => import('../logs/Logs'));
const LogsManager = React.lazy(() => import('../logs/LogsManager'));
/// POSTS
const Posts = React.lazy(() => import('../posts/Posts'));
const Post = React.lazy(() => import('../post/Post'));
const PostCreate = React.lazy(() => import('../post/PostCreate'));
const PostDelete = React.lazy(() => import('../post/PostDelete'));

const RoutesPrivate = ({ role }) => {
  let routes = (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/settings" component={Settings} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/logout" component={Logout} />
      {/* <Route exact path="/users" component={Users} /> */}
      <Route exact path="/user/create" component={UserCreate} />
      <RouterRole
        exact
        path="/users/fake"
        role={role}
        roles={['system']}
        component={UsersFake}
      />
      <RouterRole
        exact
        path="/users/list"
        role={role}
        roles={['system']}
        component={UsersList}
      />
      <RouterRole
        exact
        path="/users/manager"
        role={role}
        roles={['system']}
        component={UsersManager}
      />
      <RouterRole
        exact
        path="/profiles"
        role={role}
        roles={['system']}
        component={ProfilesList}
      />
      <RouterRole
        exact
        path="/profiles/manager"
        role={role}
        roles={['system']}
        component={ProfilesManager}
      />
      <RouterRole exact path="/logs" role={role} roles={['system']} component={Logs} />
      <RouterRole
        exact
        path="/logs/manager"
        role={role}
        roles={['system']}
        component={LogsManager}
      />
      <RouterRole
        exact
        path="/post/create"
        role={role}
        roles={['system', 'admin']}
        component={PostCreate}
      />
      <Route exact path="/post/id/:id" component={Post} />
      <Route exact path="/posts" component={Posts} />
      <RouterRole
        exact
        path="/post/delete"
        role={role}
        roles={['system']}
        component={PostDelete}
      />
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

export default RoutesPrivate;
