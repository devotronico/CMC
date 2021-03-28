import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import IconPersonAdd from '@material-ui/icons/PersonAdd';
import IconGroup from '@material-ui/icons/Group';

function SidebarUsers() {
  return (
    <List>
      <ListItem component={Link} to="/users/fake">
        <ListItemIcon>
          <IconGroup />
        </ListItemIcon>
        <ListItemText primary="Lista Utenti fake" />
      </ListItem>
      <ListItem component={Link} to="/users/fake/b">
        <ListItemIcon>
          <IconGroup />
        </ListItemIcon>
        <ListItemText primary="Lista Utenti fake B" />
      </ListItem>
      <ListItem component={Link} to="/users/create/fake">
        <ListItemIcon>
          <IconPersonAdd />
        </ListItemIcon>
        <ListItemText primary="Crea utenti finti" />
      </ListItem>
    </List>
  );
}

export default SidebarUsers;
