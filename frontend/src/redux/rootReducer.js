import { combineReducers } from 'redux';
import alert from './alert/alertReducer';
import loader from './loader/loaderReducer';
import auth from './auth/authReducer';
import user from './user/userReducer';
import users from './users/usersReducer';
import post from './post/postReducer';
import posts from './posts/postsReducer';
import notify from './notify/notifyReducer';
import logs from './logs/logsReducer';
import comment from './comment/commentReducer';
import profile from './profile/reducer';
import profiles from './profiles/reducer';

const rootReducer = combineReducers({
  alert: alert,
  loader: loader,
  auth: auth,
  user: user,
  users: users,
  post: post,
  posts: posts,
  notify: notify,
  logs: logs,
  comment: comment,
  profile: profile,
  profiles: profiles
});

export default rootReducer;
