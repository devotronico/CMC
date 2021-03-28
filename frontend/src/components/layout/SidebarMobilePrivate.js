import React from 'react';

import SegmentDashboard from './public/SegmentDashboard';
import SegmentAuthPrivate from './private/SegmentAuthPrivate';
import SegmentUsers from './public/SegmentUsersPublic';
import SegmentUsersFake from './private/SegmentUsersPrivate';
import SegmentLogs from './private/SegmentLogs';
import SegmentPostsLogged from './private/SegmentPostsPrivate';
import SegmentSettings from './private/SegmentSettings';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import IconButton from '@material-ui/core/IconButton';

export default function SidebarMobilePrivate({
  isOpen,
  toggleSidebar,
  username,
  role,
  sidebar,
  sidebarTop,
  sidebarTopClose,
  sidebarBody,
  sidebarBot
}) {
  return (
    <SwipeableDrawer
      anchor="left"
      open={isOpen}
      classes={{
        paper: sidebar
      }}
      onClose={toggleSidebar(false)}
      onOpen={toggleSidebar(true)}
    >
      <div className={sidebarTop}>
        <div className={sidebarTopClose}>
          <IconButton onClick={toggleSidebar(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <SegmentDashboard />
        <Divider />
      </div>
      <div className={sidebarBody}>
        <SegmentAuthPrivate username={username} />
        <Divider />
        <SegmentUsers />
        {['system', 'admin'].includes(role) && <SegmentUsersFake />}
        <Divider />
        <SegmentLogs />
        <Divider />
        <SegmentPostsLogged />
      </div>
      <div className={sidebarBot}>
        <Divider />
        <SegmentSettings />
      </div>
    </SwipeableDrawer>
  );
}
