import React from 'react';

import SegmentDashboard from './public/SegmentDashboard';
import SegmentAuthPrivate from './private/SegmentAuthPrivate';
import SegmentUsersPublic from './public/SegmentUsersPublic';
import SegmentUsersPrivate from './private/SegmentUsersPrivate';
import SegmentProfilePrivate from './private/SegmentProfilePrivate';
import SegmentLogs from './private/SegmentLogs';
import SegmentPostsPrivate from './private/SegmentPostsPrivate';
import SegmentSettings from './private/SegmentSettings';

import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import IconButton from '@material-ui/core/IconButton';

export default function SidebarDesktopPrivate({
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
    <Drawer
      variant="persistent"
      anchor="left"
      open={isOpen}
      classes={{
        paper: sidebar
      }}
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
        <SegmentUsersPublic />
        {['system', 'admin'].includes(role) && <SegmentUsersPrivate />}
        <Divider />
        <SegmentProfilePrivate />
        <Divider />
        <SegmentLogs />
        <Divider />
        <SegmentPostsPrivate />
      </div>
      <div className={sidebarBot}>
        <Divider />
        <SegmentSettings />
      </div>
    </Drawer>
  );
}
