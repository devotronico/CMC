import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import IconDashboard from '@material-ui/icons/Dashboard';

export default function SegmentDashboard() {
  return (
    <List>
      <ListItem component={Link} to="/">
        <ListItemIcon>
          <IconDashboard />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </List>
  );
}
