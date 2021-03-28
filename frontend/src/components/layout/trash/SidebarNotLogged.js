import React from 'react';

import SegmentDashboard from '../public/SegmentDashboard';
import SegmentAuthNotLogged from '../public/SegmentAuthPublic';
import SegmentPostsNotLogged from '../public/SegmentPostsPublic';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';

import {
  ChevronLeft as LeftIcon,
  ChevronRight as RightIcon
} from '@material-ui/icons';

// const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  }
}));

export default function SidebarNotLogged({ isOpen, toggleSidebar, sidebar }) {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <SwipeableDrawer
      id="sidebar"
      anchor="left"
      open={isOpen}
      classes={{
        paper: sidebar
      }}
      onClose={toggleSidebar(false)}
      onOpen={toggleSidebar(true)}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={toggleSidebar(false)}>
          {theme.direction === 'ltr' ? <LeftIcon /> : <RightIcon />}
        </IconButton>
      </div>
      <SegmentDashboard />
      <Divider />
      <SegmentAuthNotLogged />
      <Divider />
      <SegmentPostsNotLogged />
    </SwipeableDrawer>
  );
}
