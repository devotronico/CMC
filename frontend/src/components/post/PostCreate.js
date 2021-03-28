import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPost } from '../../redux/post/postActions';

import Header from '../shared/Header';
import Title from './create/Title';
import Options from './create/Options';
import MyTextarea from './create/MyTextarea';
import Tags from './create/Tags';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: 'orange',
    width: '100%',
    height: '100%'
  },
  body: {
    // backgroundColor: 'pink',
    display: 'flex',
    justifyContent: 'center'
  },
  paper: {
    // backgroundColor: "yellow",
    width: 800,
    height: '100%'
  },
  card: {
    // backgroundColor: "yellow",
    padding: theme.spacing(2)
  },
  content: {
    // backgroundColor: "pink",
    padding: 24
  },
  paperInnerTop: {
    // backgroundColor: 'yellow',
    marginBottom: 30
  },
  paperInnerMid: {
    // backgroundColor: 'yellow',
    height: '100%'
  },
  paperInnerBot: {
    // backgroundColor: "pink",
    width: '100%',
    height: '100%',
    marginTop: 30
  },
  action: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

function PostCreate({ createPost, post }) {
  const classes = useStyles();
  const [test, setTest] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (post) {
      setTest(true);
    }
  }, [post]);

  const handleOnClickButton = () => {
    // const tags = ['big', 'sex', 'toy'];
    createPost(title, text, tags);
  };

  const goToPagePosts = () => {
    console.log('Vai Alla Pagina POSTS');
  };

  const postAfterCreated = (
    <>
      <Button variant="contained" color="primary" onClick={goToPagePosts}>
        Vai Alla Lista dei Post
      </Button>
      Oppure
      <Button
        variant="contained"
        color="primary"
        onClick={() => setTest(false)}
      >
        Crea un Nuovo Post
      </Button>
    </>
  );

  const postBeforeCreated = (
    <Card className={classes.card}>
      <CardHeader
        action={
          <IconButton aria-label="reset">
            <RotateLeftIcon />
          </IconButton>
        }
        title="Crea un Articolo"
      />
      <CardContent className={classes.content}>
        <Paper className={classes.paperInnerTop}>
          <Title title={title} setTitle={setTitle} />
        </Paper>
        <Paper className={classes.paperInnerMid}>
          <Options />
          <MyTextarea text={text} setText={setText} />
        </Paper>
        <Paper className={classes.paperInnerBot}>
          <Tags tags={tags} setTags={setTags} />
        </Paper>
      </CardContent>
      <CardActions className={classes.action}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOnClickButton}
        >
          Salva Articolo
        </Button>
      </CardActions>
    </Card>
  );

  return (
    <div className={classes.root}>
      {/* <pre>{JSON.stringify(title, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(text, null, 2)}</pre> */}
      <Header
        section={'POSTS'}
        title={'Crea un Post'}
        subtitle={'creare un post'}
      />
      <div className={classes.body}>
        <Paper className={classes.paper}>
          {test ? postAfterCreated : postBeforeCreated}
        </Paper>
      </div>
    </div>
  );
}

PostCreate.propTypes = {
  createPost: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post.post
});

export default connect(mapStateToProps, { createPost })(PostCreate);
