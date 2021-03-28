import React from 'react';
import '../style/posts/Posts.css';
import { Route, useRouteMatch } from 'react-router-dom';

import Mode from '../components/posts/Mode';
import PostAddConnect from '../components/posts/PostAddConnect';
import PostListConnect from '../components/posts/PostListConnect';
import PostDetailsConnect from '../components/posts/PostDetailsConnect';
import PostEditConnect from '../components/posts/PostEditConnect';
import PostDeleteConnect from '../components/posts/PostDeleteConnect';
import PostFaker from '../components/posts/PostFaker';

const PostsContainer = props => {
  let match = useRouteMatch();
  return (
    <div className="content posts">
      <Mode />
      <Route path="/posts(/add)?" exact component={PostAddConnect} />
      <Route path="/posts/list" exact component={PostListConnect} />
      <Route path={`${match.path}/list/:id`}>
        <PostDetailsConnect />
      </Route>
      <Route path="/posts/edit" component={PostEditConnect} />
      <Route path="/posts/delete" component={PostDeleteConnect} />
      <Route path="/posts/faker" exact component={PostFaker} />
    </div>
  );
};

export default PostsContainer;
