import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import IconLogin from '@material-ui/icons/VpnKey';
import IconRegister from '@material-ui/icons/LockOpen';

export default function SegmentAuthPublic() {
  return (
    <List>
      <ListItem component={Link} to="/login">
        <ListItemIcon>
          <IconLogin />
        </ListItemIcon>
        <ListItemText primary="Login" />
      </ListItem>
      <ListItem component={Link} to="/register">
        <ListItemIcon>
          <IconRegister />
        </ListItemIcon>
        <ListItemText primary="Register" />
      </ListItem>
    </List>
  );
}
