import React from 'react';
// import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

/// IN ITALIANO
moment.updateLocale('en', {
  relativeTime: {
    past: function (input) {
      return input === 'adesso' ? input : input + ' fa';
    },
    s: 'adesso',
    future: 'in %s',
    ss: '%d secondi',
    m: 'un minuto',
    mm: '%d minuti',
    h: 'un ora',
    hh: '%d ore',
    d: 'un giorno',
    dd: '%d giorni',
    M: 'un mese',
    MM: '%d mesi',
    y: 'un anno',
    yy: '%d anni',
  },
});

const useStyles = makeStyles({
  comment: {
    display: 'flex',
    // alignItems: "center",
    margin: 16,
  },
  commentText: {
    padding: '8px',
    flexGrow: '1',
    marginLeft: '16px',
    borderRadius: '4px',
    backgroundColor: '#F4F6F8',
  },
  commentAuthor: {
    display: 'flex',
    // alignItems: "center",
    marginBottom: 16,
  },
  commentTime: {
    marginLeft: 'auto',
  },
});

export default function Comment({ comment }) {
  // console.log(data);

  const { user, text, created_at } = comment;
  // const { _id, user, text, created_at } = comment;
  // const { _id, user_id, name, avatar, text, created_at } = comment;
  //   console.log(comment);

  const classes = useStyles();

  return (
    <>
      <div className={classes.comment}>
        <Avatar alt={user.avatar} src={user.avatar} />
        <div className={classes.commentText}>
          <div className={classes.commentAuthor}>
            <Typography variant="body2" component="p">
              {user.name}
            </Typography>
            <Typography variant="body2" component="p" className={classes.commentTime}>
              {moment(created_at).fromNow()}
            </Typography>
          </div>
          <Typography variant="body2" component="p">
            {text}
          </Typography>
        </div>
      </div>
    </>
  );
}
