import React from 'react';

import SegmentDashboard from './public/SegmentDashboard';
import SegmentAuthNotLogged from './public/SegmentAuthPublic';
import SegmentSettings from './private/SegmentSettings';
import SegmentPostsNotLogged from './public/SegmentPostsPublic';

import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import IconButton from '@material-ui/core/IconButton';

export default function SidebarDesktopPublic({
  isOpen,
  toggleSidebar,
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
        <SegmentAuthNotLogged />
        <Divider />
        <SegmentPostsNotLogged />
      </div>
      <div className={sidebarBot}>
        <Divider />
        <SegmentSettings />
      </div>
    </Drawer>
  );
}
