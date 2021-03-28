import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  readPost,
  deletePost,
  followPostUser
} from '../../redux/post/postActions';
import { createComment } from '../../redux/comment/commentActions';

import Header from '../shared/Header';
import Comment from './details/Comment';
import SendComment from './details/SendComment';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ScheduleIcon from '@material-ui/icons/Schedule';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import StarIcon from '@material-ui/icons/Star';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const useStyles = makeStyles({
  root: {
    // backgroundColor: 'orange',
    width: '100%',
    height: '100%'
  },
  body: {
    // backgroundColor: 'green',
    display: 'flex',
    justifyContent: 'center'
    // width: 800,
  },
  card: {
    // backgroundColor: 'pink',
    width: '35%',
    minWidth: 320
  },
  postTitle: {
    paddingBottom: 0
  },
  postAuthorBlock: {
    '& > button': { marginLeft: 10 }
  },
  postAuthor: {
    textDecoration: 'none'
  },
  postText: {
    // backgroundColor: "red"
    marginBottom: 8
  },
  postTag: {
    // backgroundColor: "red"
    marginRight: 4
  },
  postOptions: {
    // backgroundColor: "red"
  },
  postDateBlock: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 12
  },
  subheader: {
    // backgroundColor: 'red'
  },
  dateIcon: {
    color: '#546e7a',
    width: 16,
    height: 16,
    marginRight: 6
  },
  content: {
    padding: 0
  }
});

function Post({
  readPost,
  deletePost,
  followPostUser,
  createComment,
  post,
  comment,
  match
}) {
  const classes = useStyles();

  const onClickDelete = () => {
    console.log('onClickDelete');
    deletePost(match.params.id);
  };
  const onClickFollow = () => {
    console.log('onClickFollow');
    followPostUser(post.user.id);
  };

  useEffect(() => {
    console.log('OK', match.params.id);
    readPost(match.params.id);
  }, [readPost]);

  useEffect(() => {
    if (post) {
      console.log('POST', post);
    }
  }, [post]);

  useEffect(() => {
    if (comment) {
      post.comments.push(comment);
      console.log('COMMENT', comment);
    }
  }, [comment]);

  const sendComment = (commentText) => {
    console.log('SEND MESSAGE 1');
    createComment(commentText, match.params.id);
  };

  // const { _id, name, avatar, created_at, comments } = data;

  if (!post) {
    return null;
  }

  const subheader = (
    <div className={classes.subheader}>
      <span className={classes.postDateBlock}>
        <ScheduleIcon className={classes.dateIcon} />
        {moment(post.created_at).format('DD-MM-YYYY | HH:mm:ss')}
      </span>
      <Typography variant="body2" gutterBottom>
        letto {post.views} volte
      </Typography>
    </div>
  );

  const author = (
    <div className={classes.postAuthorBlock}>
      <a href="autore" className={classes.postAuthor}>
        {post.user.name}
      </a>
      <Button variant="outlined" color="primary" size="small">
        Follow
      </Button>
    </div>
  );

  const options = (
    <div className={classes.postOptions}>
      <IconButton aria-label="delete" onClick={onClickDelete}>
        <DeleteIcon />
      </IconButton>
      <IconButton aria-label="follow" onClick={onClickFollow}>
        <PersonAddIcon />
      </IconButton>
    </div>
  );

  return (
    <div className={classes.root}>
      <Header
        section={'Blog'}
        title={'Visualizza Post'}
        subtitle={'Post e commenti del post'}
      />
      <div className={classes.body}>
        {post && (
          <Card className={classes.card}>
            <CardHeader title={post.title} className={classes.postTitle} />
            <CardHeader
              avatar={<Avatar alt={post.user.avatar} src={post.user.avatar} />}
              action={options}
              title={author}
              subheader={subheader}
            />
            <CardContent>
              <Typography
                variant="body2"
                component="p"
                className={classes.postText}
              >
                {post.text}
              </Typography>
              {post.tags.map((tag, i) => (
                <Chip
                  key={i}
                  label={tag}
                  component="a"
                  href="#chip"
                  clickable
                  className={classes.postTag}
                />
              ))}
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <StarIcon />
              </IconButton>
            </CardActions>
            <CardContent className={classes.content}>
              <Divider />
              <SendComment
                avatar={post.user.avatar}
                sendComment={sendComment}
              />
              {post.comments
                .slice(0)
                .reverse()
                .map((comment, i) => (
                  <div key={comment._id}>
                    <Divider />
                    <Comment comment={comment} />
                  </div>
                ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

Post.propTypes = {
  readPost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  createComment: PropTypes.func.isRequired,
  followPostUser: PropTypes.func.isRequired,
  post: PropTypes.object
};

const mapStateToProps = (state) => ({
  post: state.post.post,
  comment: state.comment.comment
});

export default connect(mapStateToProps, {
  readPost,
  deletePost,
  createComment,
  followPostUser
})(Post);
