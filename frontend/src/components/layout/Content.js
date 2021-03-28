import React from 'react';

import LoaderApi from './LoaderApi';
import Alerts from './Alerts';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const sidebarWidth = 240;
const useStyles = makeStyles((theme) => ({
  content: {
    // backgroundColor: 'blue',
    width: '100%',
    minHeight: '100%',
    flexGrow: 1,
  },
  shifted: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: sidebarWidth,
  },
  notShifted: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  contentInner: {
    // backgroundColor: 'yellow',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'start',
  },
}));

export default function Content({ isOpen, device, children }) {
  // console.log('Content');
  const classes = useStyles();
  const shift = isOpen ? 'shifted' : 'notShifted';

  return (
    <main id="content" className={clsx(classes.content, classes[shift])}>
      <div id="content-inner" className={classes.contentInner}>
        <LoaderApi />
        <Alerts />
        {children}
      </div>
    </main>
  );
}
