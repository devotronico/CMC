import React from 'react';

import LoaderApi from './LoaderApi';
import Alerts from './Alerts';

import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import clsx from 'clsx';

const sidebarWidth = 240;
const useStyles = makeStyles(theme => ({
  drawerHeader: {
    backgroundColor: 'red',
    display: 'flex',
    alignItems: 'center',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    backgroundColor: 'blue',
    width: '100%',
    minHeight: '100%',
    flexGrow: 1,
    padding: theme.spacing(0, 3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: sidebarWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  mobile: {
    padding: theme.spacing(0)
    // backgroundColor: 'green'
  },
  contentCenter: {
    backgroundColor: 'yellow',
    height: 'calc(100% - 64px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'start'
  },
  contentCenterMobile: {
    height: 'calc(100% - 56px)'
  }
}));

export default function Content({ isOpen, children }) {
  console.log('Content');
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:600px)');

  return (
    <main
      id="content"
      className={clsx(
        classes.content,
        {
          [classes.contentShift]: !isOpen
        },
        {
          [classes.mobile]: !matches
        }
      )}
    >
      <div className={classes.drawerHeader} />
      <div
        id="content-center"
        className={clsx(classes.contentCenter, {
          [classes.contentCenterMobile]: !matches
        })}
      >
        <LoaderApi />
        <Alerts />
        {children}
      </div>
    </main>
  );
}
