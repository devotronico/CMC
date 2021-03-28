import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

import IconPerson from '@material-ui/icons/Person';
import IconLogout from '@material-ui/icons/ExitToApp';

export default function SegmentAuthPrivate({ username }) {
  return (
    <List>
      <ListItem component={Link} to="/profile">
        <ListItemIcon>
          <IconPerson />
        </ListItemIcon>
        <ListItemText primary={username} />
      </ListItem>
      <ListItem component={Link} to="/logout">
        <ListItemIcon>
          <IconLogout />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </List>
  );
}
