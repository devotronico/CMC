import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';

export default function SegmentSettings() {
  return (
    <List>
      <ListItem component={Link} to="/settings">
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Settaggi" />
      </ListItem>
    </List>
  );
}
