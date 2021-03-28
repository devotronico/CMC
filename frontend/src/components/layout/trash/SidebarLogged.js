import React from 'react';

import SegmentDashboard from './SegmentDashboard';
import SegmentAuth from './SegmentAuth';
import SegmentUsers from './SegmentUsers';
import SegmentUsersFake from './SegmentUsersFake';
import SegmentLogs from './SegmentLogs';
import SegmentPosts from './SegmentPosts';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';

import {
  ChevronLeft as LeftIcon,
  ChevronRight as RightIcon
} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  }
}));

export default function SidebarLogged({
  isOpen,
  toggleSidebar,
  name,
  role,
  sidebar
}) {
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
      <SegmentAuth name={name} />
      <Divider />
      <SegmentUsers />
      {/* {role === 'admin' && <SegmentUsersFake />} */}
      {['system', 'admin'].includes(role) && <SegmentUsersFake />}
      <Divider />
      <SegmentLogs />
      <Divider />
      <SegmentPosts />
      <Divider />
    </SwipeableDrawer>
  );
}
