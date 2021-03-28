import React from 'react';

import SegmentDashboard from './public/SegmentDashboard';
import SegmentAuthNotLogged from './public/SegmentAuthPublic';
import SegmentPostsNotLogged from './public/SegmentPostsPublic';
import SegmentSettings from './private/SegmentSettings';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import IconButton from '@material-ui/core/IconButton';

export default function SidebarMobilePublic({
  isOpen,
  toggleSidebar,
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
        <SegmentAuthNotLogged />
        <Divider />
        <SegmentPostsNotLogged />
      </div>
      <div className={sidebarBot}>
        <Divider />
        <SegmentSettings />
      </div>
    </SwipeableDrawer>
  );
}
